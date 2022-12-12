import { checkIsDirectory } from '../utils.js';
import { join, parse } from 'node:path';
import { createReadStream, createWriteStream } from 'node:fs';
import { createBrotliCompress } from 'node:zlib';
import { pipeline } from 'node:stream/promises';

export const compressFile = async (pathToFile, pathToDestination) => {
  try {
    const isDestinationDirectory = await checkIsDirectory(pathToDestination);
    const nameFromPath = parse(pathToFile).name;
    const pathToZipFile = isDestinationDirectory
      ? join(pathToDestination, `${nameFromPath}.br`)
      : pathToDestination;

    const readStream = createReadStream(pathToFile);
    const writeStream = createWriteStream(pathToZipFile);
    const zipStream = createBrotliCompress();
    await pipeline(readStream, zipStream, writeStream);
  } catch {
    console.error('Operation failed');
  }
};
