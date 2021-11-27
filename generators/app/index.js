"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

module.exports = class extends Generator {
  constructor() {
    const appName =
      this.options.name || path.basename(process.cwd()) || "next-firebase";
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the exceptional ${chalk.red(
          "generator-next-firebase"
        )} generator!`
      )
    );

    const prompts = [
      {
        type: "input",
        name: "githubUser",
        message: "Github Username",
        default: "testuser",
        store: true
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.answers = props;
    });
  }

  writing() {
    const filesArray = [
      "pages",
      "public",
      "styles",
      ".eslint.js",
      ".gitignore",
      "next.config.js",
      "package.json",
      "README.md"
    ];
    const ignorePaths = [];

    filesArray.forEach(file => {
      if (file.noTemplating || file.src.includes(".png")) {
        return this.fs.copy(
          this.templatePath(file.src),
          this.destinationPath(file.dest || file.src || file),
          { globOptions: { ignore: ignorePaths } }
        );
      }

      return this.fs.copyTpl(
        this.templatePath(file.src || file),
        this.destinationPath(file.dest || file.src || file),
        this.data,
        {}, // TemplateOptions    // not here
        { globOptions: { ignore: ignorePaths } } // < but here
      );
    });
  }

  install() {
    this.installDependencies();
  }
};
