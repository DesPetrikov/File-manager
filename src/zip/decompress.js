import { checkIsDirectory } from '../utils.js';
import { basename, join } from 'node:path';
import { createReadStream, createWriteStream } from 'node:fs';
import { createBrotliDecompress } from 'node:zlib';
import { pipeline } from 'node:stream/promises';
import { rm } from 'node:fs/promises';

export const decompressFile = async (pathToFile, pathToDestination) => {
  try {
    const isDestinationDirectory = await checkIsDirectory(pathToDestination);
    const baseNameFromFile = basename(pathToFile, '.br');
    const pathToUnzipFile = isDestinationDirectory
      ? join(pathToDestination, baseNameFromFile)
      : pathToDestination;

    const readStream = createReadStream(pathToFile);
    const writeStream = createWriteStream(pathToUnzipFile);
    const unZipStream = createBrotliDecompress();
    await pipeline(readStream, unZipStream, writeStream);
    await rm(pathToFile);
  } catch {
    console.error('Operation failed');
  }
};
