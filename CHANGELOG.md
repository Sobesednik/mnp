## 5 March 2020

### [1.2.1](https://github.com/mnpjs/mnp/compare/v1.2.0...v1.2.1)

- [fix] Annotate API more.

### [1.2.0](https://github.com/mnpjs/mnp/compare/v1.1.8...v1.2.0)

- [feature] Remove blocks API.
- [doc] Export _Question_ and _PreUpdate_ types.

## 1 March 2020

### [1.1.8](https://github.com/mnpjs/mnp/compare/v1.1.7...v1.1.8)

- [deps] Update deps.

## 3 February 2020

### [1.1.7](https://github.com/mnpjs/mnp/compare/v1.1.6...v1.1.7)

- [fix] Init commit message on win.

### [1.1.6](https://github.com/mnpjs/mnp/compare/v1.1.5...v1.1.6)

- [deps] Update `makePromise` again to remove length check.

### [1.1.5](https://github.com/mnpjs/mnp/compare/v1.1.4...v1.1.5)

- [deps] Update `makePromise` for better error messages.

### [1.1.4](https://github.com/mnpjs/mnp/compare/v1.1.3...v1.1.4)

- [fix] Return on Git Clone fail.

### [1.1.3](https://github.com/mnpjs/mnp/compare/v1.1.2...v1.1.3)

- [fix] Try spawn git via cmd.

### [1.1.2](https://github.com/mnpjs/mnp/compare/v1.1.1...v1.1.2)

- [fix] Try to fix the shell spawn for Win.

### [1.1.1](https://github.com/mnpjs/mnp/compare/v1.1.0...v1.1.1)

- [fix] Fix custom licenses.

## 28 January 2020

### [1.1.0](https://github.com/mnpjs/mnp/compare/v1.0.5...v1.1.0)

- [fix] Install wikis in `wiki.git`.
- [feature] Use `-r` to pass the package name.

## 12 December 2019

### [1.0.4](https://github.com/mnpjs/mnp/compare/v1.0.3...v1.0.4)

- [fix] Set default template to `mnp/package`.
- [fix] Fix git api.
- [feature] Call `afterCommit` hook.

## 6 December 2019

### [1.0.3](https://github.com/mnpjs/mnp/compare/v1.0.2...v1.0.3)

- [fix] Correct template order.
- [feature] `git` api.

### [1.0.2](https://github.com/mnpjs/mnp/compare/v1.0.1...v1.0.2)

- [deps] `stdlib` _@wrote/wrote.exists_.

### [1.0.1](https://github.com/mnpjs/mnp/compare/v1.0.0...v1.0.1)

- [deps] `stdlib` africa.

### [1.0.0](https://github.com/mnpjs/mnp/compare/v0.14.2...v1.0.0)

- [api] Remove structures, switch to _GitHub_ templates.

## 29 June 2019

### [0.14.2](https://github.com/dpck/depack/compare/v0.14.1...v0.14.2)

- [deps] Upgrade `@mnp/package`.

## 19 April 2019

### [0.14.1](https://github.com/dpck/depack/compare/v0.14.0...v0.14.1)

- [deps] Upgrade and unlock dependencies; update the package structure.

## 30 March 2019

### [0.14.0](https://github.com/dpck/depack/compare/v0.13.1...v0.14.0)

- [feature] Flags to work with scopes.
- [structures] The newest package structure.

## 18 January 2018

### [0.13.0-1](https://github.com/artdecocode/mnp/compare/v0.12.0...v0.13.1)

- [structure] Update `idio` structure.

## 11 December 2018

### [0.12.0](https://github.com/artdecocode/mnp/compare/v0.11.1...v0.12.0)

- [feature] `azure` and `idio` structures.
- [doc] Add section breaks.
- [build] No `_esModule` check for internal deps.

## 7 October 2018

### [0.11.1](https://github.com/artdecocode/mnp/compare/v0.11.0...v0.11.1)

- [fix] Control error when cannot create a repository.

## 28 September 2018

### [0.11.0](https://github.com/artdecocode/mnp/compare/v0.10.2...v0.11.0)

- [feature] Display more information about package on check.
- [feature] Add website to GitHub when creating a package.
- [code] Refactor code into commands; use `@rqt/GitHub` API library.
- [build] Build w/out source maps.
- [fix] Run `onCreate` commands asynchronously.
- [testing] Test w/ _Zoroaster_ masks and `temp-context`.
- [structure] Update to the latest `package` structure with masks and section breaks.

## 3 September 2018

### [0.10.2](https://github.com/artdecocode/mnp/compare/v0.10.1...v0.10.2)

- [build] Build w/ `alamode`.
- [package] Update `package` to the latest (mainly for using `alamode`).

## 17 July 2018

### [0.10.1](https://github.com/artdecocode/mnp/compare/v0.10.0...v0.10.1)

- [fix] Fix documentation.

### [0.10.0](https://github.com/artdecocode/mnp/compare/v0.9.1...v0.10.0)

- [feature] Run structure scripts, including `onCreate`.
- [cli] Pass `-D` to set description, `-v` to view version.

## 14 July 2018

### [0.9.1](https://github.com/artdecocode/mnp/compare/v0.9.0...v0.9.1)

- [fix] Allow to enter empty scopes for `.mnprc`.
- [package] Move to `mnpjs` GitHub organization.
- [test] Increase test timeout to allow for integration test.

## 3 July 2018

### [0.9.0](https://github.com/artdecocode/mnp/compare/v0.8.0...v0.9.0)

- [feature] Support for scoped packages, change `.mnprc` location to the CWD, trademark replacement.
- [package] Move `mnp-package` to `@mnpjs/package`.

## 25 June 2018

### [0.8.0](https://github.com/artdecocode/mnp/compare/v0.7.2...v0.8.0)

- [doc] Compile with `documentary`, describe structure, newer gifs.
- [feature] Star created repositories, `-d` to delete repos.
- [dep] update dependencies, use `bestie`.

## 9 June 2018

### [0.7.2](https://github.com/artdecocode/mnp/compare/v0.7.1...v0.7.2)

- [structure] update `mnp-package` to `1.3.0` (badge, etc).
- [deps] use `usually` for usage information.

## 8 June 2018

### [0.7.1](https://github.com/artdecocode/mnp/compare/v0.7.0...v0.7.1)

- [fix] bin path

## 7 June 2018

### [0.7.0](https://github.com/artdecocode/mnp/compare/v0.6.3...v0.7.0)

- [feature] check if package is taken by pinging the registry.
- [cli] add usage information.
- [code] use `argufy` to parse command line arguments.

## 26 May 2018

### [0.6.3](https://github.com/artdecocode/mnp/compare/v0.6.2...v0.6.3)

- [structure] update `mnp-package`.
- [dependencies] upgrade dep.
- [test] class context.

## 18 May 2018

### [0.6.2](https://github.com/artdecocode/mnp/compare/v0.6.1...v0.6.2)

- [structure] update `mnp-package`
- [ecma] use ES modules
- [package] use build routine, `artdeco` eslint

## 4 May 2018

### [0.6.1](https://github.com/artdecocode/mnp/compare/v0.5.1...v0.6.1)

- [structure] add `mnp-package` as a default `npm` package structure
- [structure] add `mnp-structure` structure to create templates

## 2 May 2018

### [0.5.1](https://github.com/artdecocode/mnp/compare/v0.5.0...v0.5.1)

- [bugfix] upgrade `mnp-idio` to remove `build` folder.

### [0.5.0](https://github.com/artdecocode/mnp/compare/v0.4.3...v0.5.0)

- [feature] add [`idio`][https://idio.cc] structure.

## 31 December 2017

### [0.4.3](https://github.com/artdecocode/mnp/compare/v0.4.2...v0.4.3)

- [bugfix] update files record in `package.json`

### [0.4.2](https://github.com/artdecocode/mnp/compare/v0.4.1...v0.4.2)

- [src] update `wrote` and use `exists`

## 30 December 2017

### [0.4.1](https://github.com/artdecocode/mnp/compare/v0.4.0...v0.4.1)

- [bugfix] fill in github description

### [0.4.0](https://github.com/artdecocode/mnp/compare/v0.3.0...v0.4.0)

- [feature] update to `es8` and replace all dynamic data in structures.

### [0.2.6](https://github.com/artdecocode/mnp/compare/v0.1.1...v0.2.6), [0.3.0](https://github.com/artdecocode/mnp/compare/v0.2.6...v0.3.0) (24 May 2017)

- [feature] set `author` in `package.json` based on config [0012474](https://github.com/artdecocode/mnp/commit/0012474)
- [feature] enter description [98dd87b](https://github.com/artdecocode/mnp/commit/98dd87b)
- [feature] create github repo [a108cbe](https://github.com/artdecocode/mnp/commit/a108cbe)
- [feature] `git` push to origin [36351cd](https://github.com/artdecocode/mnp/commit/36351cd)
- [code] Ask multiple questions (`ask-questions.js`) with reloquent [6b7eac0](https://github.com/artdecocode/mnp/commit/6b7eac0)
- [readme] add gifs in readme [f6be1c4](https://github.com/artdecocode/mnp/commit/f6be1c4)
- [code] refactor and use [`reloquent`](https://www.npmjs.com/package/reloquent) for readline [775eec5](https://github.com/artdecocode/mnp/commit/775eec5)

### 0.1.0 && [0.1.1](https://github.com/artdecocode/mnp/compare/v0.1.0...v0.1.1) (21 May 2017)

- Create `mnp`: _My New Package_ for quickly making Node.js packages.
- [repo]: `test`, `src`, `bin`
