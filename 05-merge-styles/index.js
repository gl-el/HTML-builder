const stdout = process;
const fs = require('fs');
const path = require('path');
const srcDir = path.join(__dirname, 'styles');
const targetDir = path.join(__dirname, 'project-dist');

fs.readdir(srcDir, { withFileTypes: true }, (err, files) => {
  if (err) throw err;
  let wholeData = [];
  fs.writeFile(path.join(targetDir, 'bundle.css'), '', (err) => {
    if (err) throw err;
  })
  files.forEach((file) => {
    if (file.isFile() && path.extname(file.name) === '.css') {
      const stream = fs.createReadStream(path.join(srcDir, file.name), 'utf-8'); 
      stream.on('data', (data) => {
        wholeData.push(data);
      });
      stream.on('end', () => {
        fs.appendFile(path.join(targetDir, 'bundle.css'), wholeData.join('\n'), 'utf-8', (error) => {
          if (error) throw error;
        });
      })
    }
  });
});