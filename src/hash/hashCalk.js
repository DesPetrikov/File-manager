import { readFile } from 'node:fs/promises';
import { createHash } from 'crypto';

export const calculateHash = async (pathToFile) => {
  try {
    const data = await readFile(pathToFile, { encoding: 'utf8' });
    const hash = createHash('sha256').update(data).digest('hex');
    console.log(hash);
  } catch {
    console.error('Operation failed');
  }
};
