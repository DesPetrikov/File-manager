import { readdir } from 'node:fs/promises';

export const showListOfItems = async (path) => {
  const itemsList = {
    directory: [],
    file: [],
  };
  const files = await readdir(path, {withFileTypes: true});
  for (let item of files) {
	 const isDirectory = item.isDirectory()
    isDirectory ? itemsList.directory.push(item.name) : itemsList.file.push(item.name);
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
