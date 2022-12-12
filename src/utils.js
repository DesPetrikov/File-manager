import { lstat } from 'node:fs/promises';
import { resolve, isAbsolute } from 'node:path';

export const checkIsDirectory = async (path) => {
  try {
    const stat = await lstat(path);
    return stat.isDirectory();
  } catch {
    return false;
  }
};

export const getAbsolutePath = (currentPath, newPath) => {
  return isAbsolute(newPath) ? newPath : resolve(currentPath, newPath);
};
