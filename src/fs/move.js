import { copyFile } from './copy.js';
import { rm } from 'node:fs/promises';

export const moveFile = async (pathToFile, pathToNewDirectory) => {
  await copyFile(pathToFile, pathToNewDirectory);
  await rm(pathToFile);
};
