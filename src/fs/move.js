import { copyFileHandler } from './copy.js';
import { rm } from 'node:fs/promises';

export const moveFileHandler = async (pathToFile, pathToNewDirectory) => {
  await copyFileHandler(pathToFile, pathToNewDirectory);
  await rm(pathToFile);
};
