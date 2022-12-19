import { rm } from 'node:fs/promises';

export const deleteFile = async (pathToFile) => {
  try {
    await rm(pathToFile);
  } catch {
    console.error('Operation failed');
  }
};
