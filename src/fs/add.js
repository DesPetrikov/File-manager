import { writeFile } from 'node:fs/promises';

export const addFileHandler = async (pathToFile) => {
	await writeFile(pathToFile, '', { flag: 'wx' });
}