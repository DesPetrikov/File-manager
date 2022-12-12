import { rename } from 'node:fs/promises';

export const renameFileHandler = async (oldPath, newPath) => {
  await rename(oldPath, newPath);
};
