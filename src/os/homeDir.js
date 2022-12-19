import { homedir } from 'node:os';

export const getHomeDirectory = () => {
  console.log(`Your home directory is ${homedir()}`);
};
