import {userInfo} from 'node:os';

export const getUserName = () => {
  console.log(`Current system user name is ${userInfo().username}`);
}