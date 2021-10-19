import chalk from 'chalk';
import express, { Express } from 'express';
import fs from 'fs';
import lodash from 'lodash';
import Mustache from 'mustache';
import path from 'path';
import rimraf from 'rimraf';
import tapable from 'tapable';
import yParser from 'yargs-parser';
import deepmerge from './deepmerge/cjs';
import * as getPaths from './getPaths/getPaths';
import normalizePath from './normalizePath/normalizePath';
import winPath from './winPath/winPath';

export {
  chalk,
  express,
  fs,
  getPaths,
  lodash,
  Mustache,
  normalizePath,
  path,
  rimraf,
  tapable,
  yParser,
  winPath,
  deepmerge,
};
export type { Express };
