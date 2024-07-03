module.exports = {
  '*': ['prettier --write --ignore-unknown'],
  '*.{js,jsx,ts,tsx}': [
    () => 'tsc -p tsconfig.json --noEmit',
    () => 'next lint',
    () => 'jest --ci',
  ],
};
