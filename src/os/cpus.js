import { cpus } from 'node:os';

export const getCpusInfo = () => {
  const cpusInfo = cpus();
  console.log(`Your computer has ${cpusInfo.length} CPU cores`);
  cpusInfo.forEach((cpu, idx) => {
    const clockRate = (cpu.speed * 0.001).toFixed(2);
    console.log(
      `CPU${idx + 1}---> model: ${cpu.model}, clock rate: ${clockRate} GHz`
    );
  });
};
