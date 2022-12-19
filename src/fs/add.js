import { writeFile } from 'node:fs/promises';

export const addFile = async (pathToFile) => {
  try {
    await writeFile(pathToFile, '', { flag: 'wx' });
  } catch {
    console.error('Operation failed');
  }
};
