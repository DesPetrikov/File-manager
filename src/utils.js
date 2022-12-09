import { lstat } from 'node:fs/promises';

export const checkIsDirectory = async (path) => {
  const stat = await lstat(path);
  return stat.isDirectory();
};
