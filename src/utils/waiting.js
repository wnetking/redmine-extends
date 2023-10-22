export const waiting = (ms = 0) =>
  new Promise(resolve => setTimeout(resolve, ms));
