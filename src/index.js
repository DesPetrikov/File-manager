import { argv } from 'process';
import * as readline from 'node:readline/promises';
import { homedir } from 'os';
import { resolve } from 'node:path';
import { access } from 'node:fs/promises';
import { checkIsDirectory, getAbsolutePath } from './utils.js';
import { listOfItemsHandler } from './fs/list.js';
import { readFileHandler } from './fs/read.js';
import { addFileHandler } from './fs/add.js';
import { renameFileHandler } from './fs/rename.js';
import { copyFileHandler } from './fs/copy.js';
import { moveFileHandler } from './fs/move.js';
import { deleteFileHandler } from './fs/delete.js';
import { getEOL } from './os/eol.js';
import { getCpusInfo } from './os/cpus.js';
import { getHomeDirectory } from './os/homeDir.js';
import { getUserName } from './os/userName.js';
import { getCpuArchitecture } from './os/architecture.js';
import { calculateHashHandler } from './hash/hashCalk.js';
import { compressFileHandler } from './zip/compress.js';
import { decompressFileHandler } from './zip/decompress.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', async (line) => {
  try {
    const regExp = /\s(['|"])/g;
    const [command, ...args] = regExp.test(line)
      ? line
          .replace(regExp, '*$1')
          .split('*')
          .map((chunk) => chunk.replace(/^['|"]|['|"]$/g, ''))
      : line.split(' ');
    if (command === 'up' && args.length === 0) {
      await setNewPath('../');
    } else if (command === 'cd' && args[0]) {
      await setNewPath(args[0], command);
    } else if (command === 'ls' && args.length === 0) {
      await listOfItemsHandler(currentPath);
    } else if (command === 'cat' && args[0]) {
      readFileHandler(getAbsolutePath(currentPath, args[0]));
    } else if (command === 'add') {
      await addFileHandler(getAbsolutePath(currentPath, args[0]));
    } else if (command === 'rn' && args.length === 2) {
      const oldPath = getAbsolutePath(currentPath, args[0]);
      const newPath = getAbsolutePath(currentPath, args[1]);
      await renameFileHandler(oldPath, newPath);
    } else if (command == 'cp' && args.length === 2) {
      const pathToFile = getAbsolutePath(currentPath, args[0]);
      const pathToNewDirectory = getAbsolutePath(currentPath, args[1]);
      await copyFileHandler(pathToFile, pathToNewDirectory);
    } else if (command == 'mv' && args.length === 2) {
      const pathToFile = getAbsolutePath(currentPath, args[0]);
      const pathToNewDirectory = getAbsolutePath(currentPath, args[1]);
      await moveFileHandler(pathToFile, pathToNewDirectory);
    } else if (command === 'rm' && args.length === 1) {
      await deleteFileHandler(getAbsolutePath(currentPath, args[0]));
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
      const pathToFile = getAbsolutePath(currentPath, args[0]);
      await calculateHashHandler(pathToFile);
    } else if (command === 'compress' && args.length === 2) {
      const pathToFile = getAbsolutePath(currentPath, args[0]);
      const pathToDestination = getAbsolutePath(currentPath, args[1]);
      await compressFileHandler(pathToFile, pathToDestination);
    } else if (command === 'decompress' && args.length === 2) {
      const pathToFile = getAbsolutePath(currentPath, args[0]);
      const pathToDestination = getAbsolutePath(currentPath, args[1]);
      await decompressFileHandler(pathToFile, pathToDestination);
    }

    if (line === '.exit') {
      rl.close();
    }
  } catch (error) {
    console.error(error.message);
  } finally {
    console.log(`You are currently in ${currentPath}`);
  }
});

rl.on('close', () => {
  console.log(onCloseScriptPhrase);
});

const userName = argv
  .find((args) => args.startsWith('--username'))
  .split('=')[1];
const greetingPhrase = `Welcome to the File Manager, ${userName}!`;
const onCloseScriptPhrase = `Thank you for using File Manager, ${userName}, goodbye!`;

let currentPath = homedir();

console.log(greetingPhrase);
console.log(`You are currently in ${currentPath}`);

const setNewPath = async (path, commandName) => {
  try {
    await access(path);
    const isDirectory = await checkIsDirectory(path);
    if (commandName === 'cd' && !isDirectory) {
      throw new Error("You shouldn't write down file name in the path");
    }
    const newPath = resolve(currentPath, path);
    currentPath = newPath;
  } catch (error) {
    console.error(error.message);
  }
};
