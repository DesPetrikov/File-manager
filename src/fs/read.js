import { createReadStream } from 'node:fs';
import { Writable } from 'node:stream';
import { pipeline } from 'node:stream/promises';

export const readFile = async (path) => {
  try {
    const readStream = createReadStream(path, { encoding: 'utf-8' });
    const writeStream = new Writable({
      decodeStrings: false,
      write(chunk, encoding, callback) {
        console.log(chunk);
        callback();
      },
    });
    await pipeline(readStream, writeStream);
  } catch {
    console.error('Operation failed');
  }
};
