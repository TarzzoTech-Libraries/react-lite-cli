"use strict";

const sh = require("shelljs");
const chalk = require("chalk");
const CLI = require("clui");
const Spinner = CLI.Spinner;
const NPM_PACKAGES = "react react-dom react-router-dom";
const NPM_DEV_PACKAGES =
  "typescript awesome-typescript-loader concurrently source-map-loader webpack webpack-cli webpack-dev-server";
const NPM_DEV_TS_PACKAGES =
  "@types/react @types/react-dom @types/react-router-dom";
const NPM_CMDS = `npm i --save ${NPM_PACKAGES}`;
const NPM_DEV_CMDS = `npm i -D ${NPM_DEV_PACKAGES}`;
const NPM_DEV_TS_CMDS = `npm i -D ${NPM_DEV_TS_PACKAGES} ${NPM_DEV_PACKAGES}`;

module.exports = answers => {
  const { projectName, projectTemplate } = answers;
  const shellCmd = `cd ${projectName} && ${NPM_CMDS}`;
  const shellCmdDev = `cd ${projectName} && ${NPM_DEV_CMDS}`;
  const shellCmdDevTS = `cd ${projectName} && ${NPM_DEV_TS_CMDS}`;
  const status = new Spinner("Installation initiated ...");
  console.log("\n\n Installing", chalk.green(`${NPM_PACKAGES}`), "packages");
  status.start();
  // go into the project folder and run npm install
  sh.exec(shellCmd, (code, output) => {
    status.stop();
    const shellDevCmds =
      projectTemplate.indexOf("ts") > -1 ? shellCmdDevTS : shellCmdDev;
    const packagesInstalling =
      projectTemplate.indexOf("ts") > -1
        ? `${NPM_DEV_TS_PACKAGES} ${NPM_DEV_PACKAGES}`
        : NPM_DEV_PACKAGES;
    console.log(
      "\n\n Installing",
      chalk.green(`${packagesInstalling}`),
      "packages"
    );
    status.start();
    sh.exec(shellDevCmds, (code, output) => {
      status.stop();
      logDetails(projectName);
    });
  });
};

function logDetails(projectName) {
  console.log(
    "\n\n",
    chalk.green(`cd ${projectName}`),
    "\n\n",
    chalk.green("run npm run build"),
    "\n\ncmd to build the files",
    "\n\n",
    chalk.green("run npm start"),
    "\n\ncmd to start the project"
  );
}
