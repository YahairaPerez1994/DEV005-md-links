#!/usr/bin/env node
const { mdLinks } = require("./index.js");

const path = process.argv[2];
const optionsObj = { validate: false, stats: false };
const options = process.argv;

if (options.includes("--validate") && options.includes("--stats")) {
  optionsObj.validate = true;
  optionsObj.stats = true;
} else if (options.includes("--validate")) {
  optionsObj.validate = true;
} else if (options.includes("--stats")) {
  optionsObj.stats = true;
} else {
  optionsObj.validate = false;
  optionsObj.stats = false;
}

mdLinks(path, optionsObj)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });
