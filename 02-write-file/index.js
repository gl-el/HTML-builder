const { stdin, stdout } = process;
const fs = require('fs');
const path = require('path');
fs.writeFile(path.join(__dirname, 'text.txt'), '', () => {
  stdout.write('Enter text for file:\n');
});

stdin.on('data', (data) => {
  const string = data.toString();
  if (string.trim() == 'exit') {
    process.exit();
  } else {
    fs.appendFile(path.join(__dirname, 'text.txt'), string, 'utf-8', (error) => {
      if (error) throw error;
    });
  }
})

process.on('SIGINT', () => {
  process.exit();
});

process.on('exit', () => {stdout.write('File ready, exiting..')});