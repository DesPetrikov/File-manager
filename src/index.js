import { argv } from 'process';
import readLine from 'node:readline/promises';

const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (line) => {
  if (line === '.exit') {
    rl.close();
  }
});
rl.on('close', () => {
  console.log(onCloseScriptPhrase);
});

const userName = argv
  .find((args) => args.startsWith('--username'))
  .split('=')[1];
const greetingPhrase = `Welcome to the File Manager, ${userName}!`;
const onCloseScriptPhrase = `Thank you for using File Manager, ${userName}, goodbye!`

console.log(greetingPhrase);

