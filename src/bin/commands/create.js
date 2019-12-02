import { resolve, join, dirname } from 'path'
import { assertDoesNotExist } from 'wrote'
import { c, b } from 'erte'
import askQuestions, { askSingle } from 'reloquent'
import cloneSource, { getRegexes, updatePackageJson } from '../../lib/clone-source'
import git from '../../lib/git'
import { assertNotInGitPath } from '../../lib/git-lib'
import { getStructure, create } from '../../lib'
import GitHub from '@rqt/github'
import { Replaceable, replace } from 'restream'
import readDirStructure, { getFiles } from '@wrote/read-dir-structure'
import { read, write, rm } from '@wrote/wrote'
import API from '../../lib/api'
import { writeFileSync, readFileSync } from 'fs'
// const GitHub = require(/* depack */'@rqt/github/src')

const getDescription = async (description) => {
  if (description) return description
  const res = await askSingle({
    text: 'Description',
    postProcess: s => s.trim(),
    defaultValue: '',
  })
  return res
}

const getPackageNameWithScope = (packageName, scope) => {
  return `${scope ? `@${scope}/` : ''}${packageName}`
}

const DEFAULT_FILENAMES = ['LICENSE', '.gitignore', '.eslintrc']
const DEFAULT_EXTENSIONS = ['js','.jsx','md','html','json','css','xml']

/**
 * @param {_mnp.Settings} settings
 */
export default async function runCreate(settings, {
  name,
  struct,
  token,
  description: _description,
}) {
  await assertNotInGitPath()
  const github = new GitHub(token)
  const {
    org,
    website,
    scope,
    name: userName,
    email,
  } = settings
  const packageName = getPackageNameWithScope(name, scope)

  const path = resolve(name)
  await assertDoesNotExist(path)

  console.log(`# ${packageName}`)

  const description = await getDescription(_description)

  let ssh_url, git_url, html_url

  const knownStructures = {
    splendid: { 'org': 'mnpjs', name: 'splendid' },
    package: { 'org': 'mnpjs', name: 'package' },
  }
  const s = knownStructures[struct]
  try {
    if (s) {
      ({
        'ssh_url': ssh_url,
        'git_url': git_url,
        'html_url': html_url,
      } = await github.repos.generate(s.org, s.name, {
        owner: org,
        name: name,
        description,
        // private
      }))
      // debugger
    } else {
      ({
        'ssh_url': ssh_url,
        'git_url': git_url,
        'html_url': html_url,
      } = await github['repos']['create']({
        'name': name,
        'org': org,
        'description': description,
        'auto_init': true,
        'gitignore_template': 'Node',
        'homepage': website,
        'license_template': 'mit',
      }))
    }
  } catch (err) {
    if (err.message == 'Repository: name already exists on this account') {
      const l = org ? ` https://github.com/${org}/${name}` : ''
      const e = new Error(`Repository${l} already exists.`)
      e.controlled = 1
      throw e
    }
    err.controlled = 1
    throw err
  }

  if (!ssh_url)
    throw new Error('GitHub repository was not created via the API.')

  await github.activity.star(org, name)
  console.log(
    '%s\n%s',
    c('⭐️  Created and starred a new repository', 'grey'),
    b(html_url, 'green'),
  )

  await git(['clone', ssh_url, path])

  console.log('Setting user %s<%s>...', userName, email)
  await git(['config', 'user.name', userName], path)
  await git(['config', 'user.email', email], path)

  let structurePath, onCreate
  const sets = {
    ...settings,
    name,
    packageName,
    author_name: userName,
    author_email: email,
    issues_url: `${html_url}/issues`,
    readme_url: `${html_url}#readme`,
    git_url,
    ssh_url,
    html_url,
    description,
  }
  if (s) {
    // read the mnp.js file
    require('alamode')()
    let { questions, afterInit, preUpdate, files: {
      extensions: fileExtensions = DEFAULT_EXTENSIONS,
      filenames = DEFAULT_FILENAMES,
    } = {} } = require(`${path}/mnp`)
    ;({ onCreate } = require(`${path}/mnp`))

    const { content } = await readDirStructure(path, {
      ignore: ['.git'],
    })
    let files = getFiles(content, path)
    const fer = new RegExp(`\\.${fileExtensions.join('|')}$`)

    if (typeof filenames == 'function') {
      filenames = filenames(DEFAULT_FILENAMES)
    }
    if (typeof fileExtensions == 'function') {
      fileExtensions = fileExtensions(DEFAULT_EXTENSIONS)
    }

    const fns = filenames
      .filter(f => typeof f == 'string')
      .map(f => join(path, f))
    const fnre = filenames
      .filter(f => f instanceof RegExp)

    files = files
      .filter(p => {
        if (fns.includes(p)) return true
        const matches = fnre.some((re) => {
          re.lastIndex = 0
          return re.test(p)
        })
        if (matches) return true
        fer.lastIndex = 0
        return fer.test(p)
      })

    const api = new API(path, files, github, sets)

    const { q, afterQuestions } = reduceTemplate({
      ...questions,
      ...mnpQuestions,
      ...questions,
    }, sets, api.proxy)

    const answers = await askQuestions(q)
    const aliases = Object.entries(q).reduce((acc, [key, { alias }]) => {
      if (alias) acc[alias] = answers[key]
      return acc
    }, {})
    Object.assign(sets, answers)

    await api.fixGitignore()

    await Object.entries(afterQuestions).reduce(async (acc, [key, fn]) => {
      await acc
      const res = await fn()
      if (typeof res == 'string')
        sets[key] = res
      else Object.assign(sets, res)
    }, {})

    if (preUpdate) await preUpdate(sets, api.proxy)

    // go into the repo and update with core replacements
    const regexes = getRegexes(sets, aliases)

    await Promise.all(api.files.map(async (p) => {
      const r = new Replaceable(regexes)
      const file = await read(p)
      const res = await replace(r, file)
      await write(p, res)
    }))

    if (afterInit) await afterInit(sets, api.proxy)

    try {
      await rm(join(path, 'mnp.js'))
    } catch (er) {
      await rm(join(path, 'mnp'))
    }
    await updatePackageJson(path, sets, false)
  } else {
    const { structure, scripts, structurePath: sp } = getStructure(struct)
    structurePath = sp
    ;({ onCreate } = scripts)

    await cloneSource(structure, path, sets)
  }

  await git('add .', path, true)
  await git(['commit', '-m', 'initialise package'], path, true)
  console.log('Initialised package structure, pushing.')
  await git('push origin master', path, true)

  if (onCreate) {
    await create(path,
      struct == 'splendid' ? path : structurePath,
      onCreate)
  }

  console.log('Created a new package: %s.', c(packageName, 'green'))
}

/**
 * @param {Object} questions The array with template questions.
 * @param {Object} sets The settings.
 * @param {Object} api The API methods.
 */
const reduceTemplate = (questions, sets, api) => {
  const aq = {}
  const q = Object.entries(questions).reduce((acc, [key, qq]) => {
    /** @type {_reloquent.Question} */
    const question = { text: qq.text || key, alias: qq.alias }

    if (typeof qq == 'function') {
      const def = () => qq(sets)
      question.getDefault = def
    } else {
      const { getDefault, confirm } = qq
      let { afterQuestions } = qq
      if (confirm !== undefined) {
        question.text = `${question.text} [y/n]`
        if (confirm) question.defaultValue = 'y'
        else question.defaultValue = 'n'
        question.postProcess = (a) => a == 'y'
      } else if (getDefault) {
        question.getDefault = () => getDefault(sets)
      }
      if (afterQuestions) {
        const boundAfterQuestions = () => {
          return afterQuestions(api, sets[key], sets)
        }
        aq[key] = boundAfterQuestions
      }
    }
    acc[key] = question
    return acc
  }, {})
  return { q, afterQuestions: aq }
}

const mnpQuestions = {
  license: {
    text: 'Choose a license (e.g., agpl-3.0, apache-2.0, bsd-3-clause, gpl-3.0, mit, custom)\nSee full list at https://github.com/mnpjs/licenses\nLicense',
    getDefault() {
      return 'agpl-3.0'
    },
    // https://spdx.org/licenses/
    afterQuestions({ warn, addFile, resolve: res }, license) {
      if (license == 'custom') return 'SEE LICENSE IN LICENSE'
      const r = require('@mnpjs/licenses')
      const exists = license in r
      if (!exists) return warn(`Unknown license ${license}`)

      const l = join(dirname(require.resolve('@mnpjs/licenses/package.json')), 'licenses', `${license}.txt`)
      const li = readFileSync(l, 'utf8')
      writeFileSync(res('LICENSE'), li)
      addFile('LICENSE')
      return {
        license_spdx: r[license].spdx,
        license_name: r[license].name,
      }
    },
  },
}

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../../../').Settings} _mnp.Settings
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('restream').Rule} _restream.Rule
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('reloquent/types').Question} _reloquent.Question
 */
