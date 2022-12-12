import { rename } from 'node:fs/promises';

export const renameFile = async (oldPath, newPath) => {
  await rename(oldPath, newPath);
};
