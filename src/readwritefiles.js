"use strict";
const path = require("path");
const fs = require("fs");
const pkgTemplate = require("./package-template");
let PROJECT_NAME = "";
let AUTHOR = "";
const CURRENT_DIR = process.cwd();

module.exports = answers => {
  const projectTemplate = answers["project-template"];
  const projectName = answers["project-name"];
  PROJECT_NAME = answers["project-name"];
  AUTHOR = Boolean(answers["author"]) ? answers["author"] : "";

  // path for the template location
  const templatePath = `${path.resolve(
    __dirname,
    ".."
  )}/templates/${projectTemplate}`;

  // Creating a folder with the project name provided
  fs.mkdirSync(`${CURRENT_DIR}/${projectName}`);

  // Function call for creating the selected template files to the new project folder
  createDirectoryContents(templatePath, projectName);
  return { projectName, projectTemplate };
};

function createDirectoryContents(templatePath, projectName) {
  // Reading the file names in the provided path
  const filesToCreate = fs.readdirSync(templatePath);

  // looping the files list
  filesToCreate.forEach(file => {
    // path of the file
    const originalFilePath = `${templatePath}/${file}`;

    // to get the stats(gives the details about the file) of the file.
    const stats = fs.statSync(originalFilePath);

    // checking for the file is a type file
    if (stats.isFile()) {
      // reading the content in the provided file path
      const content = fs.readFileSync(originalFilePath, "utf8");

      // constructing the path for the new file to create
      const writePath = `${CURRENT_DIR}/${projectName}/${file}`;

      // Checking for package.json file name
      if (file === "package.json") {
        // replacing the name with user entered name
        pkgTemplate.name = PROJECT_NAME;
        pkgTemplate.author = AUTHOR;
        fs.writeFileSync(writePath, JSON.stringify(pkgTemplate), "utf8");
      } else if (file === "index.html") {
        fs.writeFileSync(
          writePath,
          content.replace(/{project-name}/g, PROJECT_NAME),
          "utf8"
        );
      } else {
        fs.writeFileSync(writePath, content, "utf8");
      }
    }
    // checking for the file is a type folder
    else if (stats.isDirectory()) {
      fs.mkdirSync(`${CURRENT_DIR}/${projectName}/${file}`);

      // recursive call
      createDirectoryContents(originalFilePath, `${projectName}/${file}`);
    }
  });
}
