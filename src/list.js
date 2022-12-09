import { readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { checkIsDirectory } from './utils.js';

export const listOfItemsHandler = async (path) => {
  const itemsList = {
    directory: [],
    file: [],
  };
  const files = await readdir(path);
  for (let item of files) {
    const pathToItem = join(path, item);
    const isDirectory = await checkIsDirectory(pathToItem);
    isDirectory ? itemsList.directory.push(item) : itemsList.file.push(item);
  }

  const sortedItems = Object.entries(itemsList)
    .map((category) =>
      category[1]
        .sort((a, b) => a.toLowerCase() - b.toLowerCase())
        .map((item) => ({ Name: item, Type: category[0] }))
    )
    .flat();
  console.table(sortedItems);
};
