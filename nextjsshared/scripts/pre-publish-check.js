const fs = require('fs');
const path = require('path');

console.log('🔍 Running pre-publish checks...\n');

const checks = [
  {
    name: 'package.json exists',
    check: () => fs.existsSync('package.json'),
  },
  {
    name: 'dist directory exists',
    check: () => fs.existsSync('dist'),
  },
  {
    name: 'README.md exists',
    check: () => fs.existsSync('README.md'),
  },
  {
    name: 'main file exists',
    check: () => {
      const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      return fs.existsSync(pkg.main);
    },
  },
  {
    name: 'types file exists',
    check: () => {
      const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      return fs.existsSync(pkg.types);
    },
  },
  {
    name: 'version is valid',
    check: () => {
      const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      return /^\d+\.\d+\.\d+/.test(pkg.version);
    },
  },
  {
    name: 'no typescript errors',
    check: () => {
      try {
        const { execSync } = require('child_process');
        execSync('npx tsc --noEmit', { stdio: 'pipe' });
        return true;
      } catch {
        return false;
      }
    },
  },
];

let allPassed = true;

checks.forEach(({ name, check }) => {
  const passed = check();
  console.log(`${passed ? '✅' : '❌'} ${name}`);
  if (!passed) allPassed = false;
});

console.log('\n' + (allPassed ? '🎉 All checks passed!' : '❌ Some checks failed!'));
process.exit(allPassed ? 0 : 1);