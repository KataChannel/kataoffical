#!/usr/bin/env node
import inquirer from 'inquirer';
import { generateNestFiles } from './nestjs.js';
import { generateAngularFiles } from './angular.js';

async function promptUser(type, name, outputDir) {
  const questions = [];

  if (!type) {
    questions.push({
      type: 'input',
      name: 'type',
      message: 'Chọn Loại Ứng Dụng',
      default: 'nestjs',
      validate: (input) => (input ? true : 'Type cannot be empty.'),
    });
  }

  if (!name) {
    questions.push({
      type: 'input',
      name: 'name',
      message: 'Tên Ứng Dụng:',
      validate: (input) => (input ? true : 'Name cannot be empty.'),
    });
  }

  if (!outputDir) {
    questions.push({
      type: 'input',
      name: 'outputDir',
      message: 'Chọn Thư Mục (default: ./src):',
      default: './src',
    });
  }

  const answers = await inquirer.prompt(questions);

  return {
    type: type || answers.type,
    name: name || answers.name,
    outputDir: outputDir || answers.outputDir,
  };
}

// Parse command-line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const parsedArgs = {};

  for (let i = 0; i < args.length; i += 2) {
    const key = args[i].replace('--', '');
    const value = args[i + 1];
    parsedArgs[key] = value;
  }

  return parsedArgs;
}

// Main function
(async function main() {
  const args = parseArgs();

  const answers = await promptUser(args.type, args.name, args.outputDir);
  console.log(answers);

  switch (answers.type) {
    case 'nestjs':
      console.log('nestjs');
      await generateNestFiles(answers);
      break;
    case 'angular':
      console.log('angular');
      await generateAngularFiles(answers);
      break;
    default:
      console.log('Invalid type');
      break;
  }
})();

