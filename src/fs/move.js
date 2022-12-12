import { copyFile } from './copy.js';
import { rm } from 'node:fs/promises';

export const moveFile = async (pathToFile, pathToNewDirectory) => {
  try {
    await copyFile(pathToFile, pathToNewDirectory);
    await rm(pathToFile);
  } catch {
    console.error('Operation failed');
  }
};
