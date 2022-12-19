import { arch } from 'node:os';

export const getCpuArchitecture = () => {
  console.log(`CPU architecture is ${arch()}`);
};
