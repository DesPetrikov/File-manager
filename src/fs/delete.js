import { rm } from 'node:fs/promises';

export const deleteFile = async (pathToFile) => await rm(pathToFile);
