import { createReadStream } from 'node:fs';
import { stdout } from 'node:process';

export const readFile = (path) => {
  const readStream = createReadStream(path);
  readStream.pipe(stdout);
};
