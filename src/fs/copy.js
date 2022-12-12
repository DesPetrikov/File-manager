import { writeFile } from 'node:fs/promises';
import { basename, join } from 'node:path';
import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';

export const copyFileHandler = async (pathToFile, pathToNewDirectory) => {
  const newFilePath = join(pathToNewDirectory, basename(pathToFile));
  await writeFile(newFilePath, '', { flag: 'wx' });
  const readStream = createReadStream(pathToFile);
  const writeStream = createWriteStream(newFilePath);
  await pipeline(readStream, writeStream);
};
