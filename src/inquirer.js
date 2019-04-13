"use strict";
const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");

const CHOICES = fs.readdirSync(`${path.resolve(__dirname, "..")}/templates`);

const QUESTIONS = [
    {
        name: "project-template",
        type: "list",
        message: "Select the template of the project.",
        choices: CHOICES
    },
    {
        name: "project-name",
        type: "input",
        message: "Enter project name: ",
        validate: function (value) {
            if (/^([A-Za-z\-\_\d])+$/.test(value)) return true;
            else return "Project name may only include letters, numbers, underscores and hashes.";
        }
    },
    {
        name: "author",
        type: "input",
        message: "Enter author name: (optional)"
    }
];

module.exports = {
    init: () => {
        return inquirer.prompt(QUESTIONS);
    }
};