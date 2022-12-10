import { createReadStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { stdout } from 'node:process';

export const readFileHandler = (path) => {
  const readStream = createReadStream(path);
  readStream.pipe(stdout)
};
