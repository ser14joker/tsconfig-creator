#!/usr/bin/env node
const inquirer = require("inquirer");
const fs = require("fs");

const reactNativeTsConfig = require("./samples/tsconfig.react-native.json");
const reactTsConfig = require("./samples/tsconfig.react.json");
const nodeTsConfig = require("./samples/tsconfig.node.json");

inquirer
  .prompt([
    {
      type: "list",
      message: "Select the environement you're using ⬇",
      name: "environement",
      choices: ["Node", "React-native", "React"],
    },
  ])
  .then((answers) => {
    let tsconfigToWrite = "";
    switch (answers.environement) {
      case "React":
        tsconfigToWrite = reactTsConfig;
        break;
      case "React-native":
        tsconfigToWrite = reactNativeTsConfig;
        break;
      default:
        tsconfigToWrite = nodeTsConfig;
        break;
    }

    const cwd = process.cwd();
    fs.writeFileSync(
      `${cwd}/tsconfig.json`,
      JSON.stringify(tsconfigToWrite, null, 2)
    );
    console.log("tsconfig.json successfully created ✔");
  })
  .catch((error) => {
    console.log({ error });
  });
