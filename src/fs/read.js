import { createReadStream } from 'node:fs';
import { stdout } from 'node:process';

export const readFile = (path) => {
  try {
    const readStream = createReadStream(path);
    readStream.pipe(stdout);
  } catch {
    console.error('Operation failed');
  }
};
