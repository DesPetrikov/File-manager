import { rm } from 'node:fs/promises';

export const deleteFileHandler = async (pathToFile) => await rm(pathToFile);
