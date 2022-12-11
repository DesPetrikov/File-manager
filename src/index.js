import { argv } from 'process';
import * as readline from 'node:readline/promises';
import { homedir } from 'os';
import { resolve } from 'node:path';
import { access } from 'node:fs/promises';
import { checkIsDirectory, getAbsolutePath } from './utils.js';
import { listOfItemsHandler } from './list.js';
import { readFileHandler } from './read.js';
import { addFileHandler } from './add.js';
import { renameFileHandler } from './rename.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', async (line) => {
  const [command, ...args] = line.split(' ');
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
  }

  if (line === '.exit') {
    rl.close();
  }
  console.log(`You are currently in ${currentPath}`);
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
