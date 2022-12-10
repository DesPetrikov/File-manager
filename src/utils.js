import { lstat } from 'node:fs/promises';
import { resolve, isAbsolute } from 'node:path';

export const checkIsDirectory = async (path) => {
  const stat = await lstat(path);
  return stat.isDirectory();
};

export const getAbsolutePath = (currentPath, newPath) => {
	return isAbsolute(newPath) ? newPath : resolve(currentPath, newPath);
}
  
