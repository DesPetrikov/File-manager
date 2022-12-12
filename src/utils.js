import { lstat } from 'node:fs/promises';
import { resolve, isAbsolute } from 'node:path';
import { access } from 'node:fs/promises';
import { argv } from 'process';

export const checkIsDirectory = async (path) => {
  try {
    const stat = await lstat(path);
    return stat.isDirectory();
  } catch {
    return false;
  }
};

export const getAbsolutePath = (currentPath, newPath) => {
  return isAbsolute(newPath) ? newPath : resolve(currentPath, newPath);
};

export const parseCommandLine = (commandLine) => {
  const regExp = /\s(['|"])/g;
  return regExp.test(commandLine)
    ? commandLine
        .replace(regExp, '*$1')
        .split('*')
        .map((chunk) => chunk.replace(/^['|"]|['|"]$/g, ''))
    : commandLine.split(' ');
};

export const setNewPath = async (currentPath, newPath, commandName) => {
  const absolutePath = getAbsolutePath(currentPath, newPath);
  await access(absolutePath);
  const isDirectory = await checkIsDirectory(absolutePath);
  if (commandName === 'cd' && !isDirectory) {
    throw new Error('Invalid input');
  }
  return absolutePath;
};

export const userNameHandler = () => {
  const userName = argv
    .find((args) => args.startsWith('--username'))
    .split('=')[1];
  const greetingPhrase = `Welcome to the File Manager, ${userName}!`;
  const onCloseScriptPhrase = `Thank you for using File Manager, ${userName}, goodbye!`;
  return {
    greetingPhrase,
    onCloseScriptPhrase,
  };
};
