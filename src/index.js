import * as readline from 'node:readline/promises';
import { homedir } from 'os';
import {
  getAbsolutePath,
  parseCommandLine,
  setNewPath,
  userNameHandler,
} from './utils.js';
import { showListOfItems } from './fs/list.js';
import { readFile } from './fs/read.js';
import { addFile } from './fs/add.js';
import { renameFile } from './fs/rename.js';
import { copyFile } from './fs/copy.js';
import { moveFile } from './fs/move.js';
import { deleteFile } from './fs/delete.js';
import { getEOL } from './os/eol.js';
import { getCpusInfo } from './os/cpus.js';
import { getHomeDirectory } from './os/homeDir.js';
import { getUserName } from './os/userName.js';
import { getCpuArchitecture } from './os/architecture.js';
import { calculateHash } from './hash/hashCalk.js';
import { compressFile } from './zip/compress.js';
import { decompressFile } from './zip/decompress.js';

let currentPath = homedir();

const { greetingPhrase, onCloseScriptPhrase } = userNameHandler();

console.log(greetingPhrase);
console.log(`You are currently in ${currentPath}`);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', async (line) => {
  const [command, ...args] = parseCommandLine(line);
  try {
    const absolutePathFromFirstArg =
      args[0] && getAbsolutePath(currentPath, args[0]);
    const absolutePathFromSecondArg =
      args[1] && getAbsolutePath(currentPath, args[1]);
    if (command === 'up' && args.length === 0) {
      currentPath = await setNewPath(currentPath, '../', command);
    } else if (command === 'cd' && args.length === 1) {
      currentPath = await setNewPath(currentPath, args[0], command);
    } else if (command === 'ls' && args.length === 0) {
      await showListOfItems(currentPath);
    } else if (command === 'cat' && args.length === 1) {
      await readFile(absolutePathFromFirstArg);
    } else if (command === 'add' && args.length === 1) {
      await addFile(absolutePathFromFirstArg);
    } else if (command === 'rn' && args.length === 2) {
      await renameFile(absolutePathFromFirstArg, absolutePathFromSecondArg);
    } else if (command === 'cp' && args.length === 2) {
      await copyFile(absolutePathFromFirstArg, absolutePathFromSecondArg);
    } else if (command === 'mv' && args.length === 2) {
      await moveFile(absolutePathFromFirstArg, absolutePathFromSecondArg);
    } else if (command === 'rm' && args.length === 1) {
      await deleteFile(absolutePathFromFirstArg);
    } else if (command === 'os' && args.length === 1) {
      if (args[0] === '--EOL') {
        getEOL();
      } else if (args[0] === '--cpus') {
        getCpusInfo();
      } else if (args[0] === '--homedir') {
        getHomeDirectory();
      } else if (args[0] === '--username') {
        getUserName();
      } else if (args[0] === '--architecture') {
        getCpuArchitecture();
      }
    } else if (command === 'hash' && args.length === 1) {
      await calculateHash(absolutePathFromFirstArg);
    } else if (command === 'compress' && args.length === 2) {
      await compressFile(absolutePathFromFirstArg, absolutePathFromSecondArg);
    } else if (command === 'decompress' && args.length === 2) {
      await decompressFile(absolutePathFromFirstArg, absolutePathFromSecondArg);
    } else if (command === '.exit') {
      rl.close();
    } else {
      throw new Error('Invalid input');
    }
  } catch (error) {
    console.error(error.message);
  } finally {
    if (command !== '.exit') {
      console.log(`You are currently in ${currentPath}`);
    }
  }
});

rl.on('SIGINT', rl.close);

rl.on('close', () => {
  console.log(onCloseScriptPhrase);
});
