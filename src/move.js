import { copyFileHandler } from "./copy.js"
import { unlink } from 'node:fs/promises';

export const moveFileHandler = async (pathToFile, pathToNewDirectory) => {
	await copyFileHandler(pathToFile, pathToNewDirectory);
	await unlink(pathToFile)
}