#!/usr/bin/env node

"use strict";
const chalk = require("chalk");
const figlet = require("figlet");

const pkg = require("./package.json");
const inquirer = require("./src/inquirer");
const installer = require("./src/installer");
const readWriteFiles = require("./src/readwritefiles");

var currentNodeVersion = process.versions.node;
var semver = currentNodeVersion.split(".");
var major = semver[0];

const run = async () => {
    await inquirer.init()
        .then(readWriteFiles)
        .then(installer);
}

console.log(
    chalk.bold.red(
        figlet.textSync("React Lite CLI", { horizontalLayout: "full" })
    ),
    `\n`,
    chalk.green("version: " + pkg.version)
);

if (major < 8) {
    console.error(
        chalk.red(
            "You are running Node " +
            currentNodeVersion +
            ".\n" +
            "Create React App requires Node 8 or higher. \n" +
            "Please update your version of Node."
        )
    );
    process.exit(1);
} else {
    run();
}