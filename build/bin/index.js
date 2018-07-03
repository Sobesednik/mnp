#!/usr/bin/env node
"use strict";

var _path = require("path");

var _wrote = require("wrote");

var _reloquent = require("reloquent");

var _argufy = _interopRequireDefault(require("argufy"));

var _erte = require("erte");

var _usage = _interopRequireDefault(require("./usage"));

var _cloneSource = _interopRequireDefault(require("../lib/clone-source"));

var _git = _interopRequireDefault(require("../lib/git"));

var _gitLib = require("../lib/git-lib");

var _github = require("../lib/github");

var _lib = require("../lib");

var _info = _interopRequireDefault(require("../lib/info"));

var _signIn = _interopRequireDefault(require("../lib/sign-in"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  struct,
  help,
  name: _name,
  check,
  delete: del,
  init,
  local: _local
} = (0, _argufy.default)({
  struct: 's',
  help: {
    short: 'h',
    boolean: true
  },
  name: {
    command: true
  },
  check: {
    short: 'c',
    boolean: true
  },
  delete: 'd',
  init: {
    short: 'I',
    boolean: true
  },
  local: {
    short: 'l',
    boolean: true
  }
});
const ANSWER_TIMEOUT = null;

const makeGitLinks = (org, name) => ({
  ssh_url: `git://github.com/${org}/${name}.git`,
  git_url: 123,
  html_url: `https://github.com/${org}/${name}#readme`
});

if (help) {
  const u = (0, _usage.default)();
  console.log(u);
  process.exit();
}

(async () => {
  try {
    if (init) {
      await (0, _signIn.default)(_local, true);
      return;
    }

    debugger;

    if (del) {
      await (0, _github.deleteRepository)(token, del, org);
      console.log('Deleted %s/%s.', org, del);
      return;
    }

    const packageName = _name || (await (0, _reloquent.askSingle)({
      text: 'Package name',

      validation(a) {
        if (!a) throw new Error('You must specify package name.');
      }

    }, ANSWER_TIMEOUT));

    if (check) {
      console.log('Checking package %s...', packageName);
      const available = await (0, _info.default)(packageName);
      console.log('Package named %s is %s.', available ? (0, _erte.c)(packageName, 'green') : (0, _erte.c)(packageName, 'red'), available ? 'available' : 'taken');
      return;
    }

    const structure = (0, _lib.getStructure)(struct);
    const {
      org,
      token,
      name: userName,
      email,
      website,
      legalName
    } = await (0, _signIn.default)(_local);
    const path = (0, _path.resolve)(packageName);
    await (0, _wrote.assertDoesNotExist)(path);
    await (0, _gitLib.assertNotInGitPath)();
    console.log(`# ${packageName}`);
    const description = await (0, _reloquent.askSingle)({
      text: 'Description',
      postProcess: s => s.trim(),
      defaultValue: ''
    }, ANSWER_TIMEOUT);
    const {
      ssh_url: sshUrl,
      git_url: gitUrl,
      html_url: htmlUrl
    } = await (0, _github.createRepository)(token, packageName, org, description);
    if (!sshUrl) throw new Error('GitHub repository was not created via API.');
    await (0, _github.starRepository)(token, packageName, org);
    console.log('%s\n%s', (0, _erte.c)('Created and starred a new repository', 'grey'), (0, _erte.b)(htmlUrl, 'green'));
    const readmeUrl = `${htmlUrl}#readme`;
    const issuesUrl = `${htmlUrl}/issues`;
    await (0, _git.default)(['clone', sshUrl, path]);
    console.log('Setting user %s<%s>...', userName, email);
    await (0, _git.default)(['config', 'user.name', userName], path);
    await (0, _git.default)(['config', 'user.email', email], path);
    await (0, _cloneSource.default)(structure, path, {
      org,
      packageName,
      website,
      authorName: userName,
      authorEmail: email,
      year: `${new Date().getFullYear()}`,
      issuesUrl,
      readmeUrl,
      gitUrl,
      description,
      legalName
    });
    await (0, _git.default)('add .', path, true);
    await (0, _git.default)(['commit', '-m', 'initialise package'], path, true);
    console.log('Initialised package structure, pushing.');
    await (0, _git.default)('push origin master', path, true);
    console.log('Created a new package: %s.', (0, _erte.c)(packageName, 'green'));
  } catch ({
    controlled,
    message,
    stack
  }) {
    if (controlled) {
      console.error(message);
    } else {
      console.error(stack);
    }

    process.exit(1);
  }
})();
//# sourceMappingURL=index.js.map