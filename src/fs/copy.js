import { access, writeFile } from 'node:fs/promises';
import { basename, join } from 'node:path';
import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';

export const copyFile = async (pathToFile, pathToNewDirectory) => {
  try {
    await access(pathToFile);
    const newFilePath = join(pathToNewDirectory, basename(pathToFile));
    await writeFile(newFilePath, '', { flag: 'wx' });
    const readStream = createReadStream(pathToFile);
    const writeStream = createWriteStream(newFilePath);
    await pipeline(readStream, writeStream);
  } catch {
    console.error('Operation failed');
  }
};
