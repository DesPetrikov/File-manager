import { writeFile } from 'node:fs/promises';

export const addFile = async (pathToFile) => {
	await writeFile(pathToFile, '', { flag: 'wx' });
}