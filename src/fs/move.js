import { copyFile } from './copy.js';
import { access, rm } from 'node:fs/promises';

export const moveFile = async (pathToFile, pathToNewDirectory) => {
  try {
    await access(pathToFile);
    await copyFile(pathToFile, pathToNewDirectory);
    await rm(pathToFile);
  } catch {
    console.error('Operation failed');
  }
};
