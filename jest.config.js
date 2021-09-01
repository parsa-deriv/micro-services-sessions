const path = require('path');
const { lstatSync, readdirSync } = require('fs');
const base = require('./jest.config.base');

const basePath = path.resolve(__dirname, 'packages');

const packages = readdirSync(basePath).filter((name) => {
  return lstatSync(path.join(basePath, name)).isDirectory();
});

module.exports = {
  ...base,
  moduleNameMapper: {
    ...packages.reduce(
      (acc, name) => ({
        ...acc,
        [`@derivservices/${name}(.*)$`]: `<rootDir>/packages/./${name}/src/$1`,
      }),
      {}
    ),
  },
};
