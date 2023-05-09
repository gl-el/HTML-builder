const stdout = process;
const fs = require('fs');
const path = require('path');
const srcDir = path.join(__dirname, 'styles');
const targetDir = path.join(__dirname, 'project-dist');


function mergeFiles(src, target, name) {
  fs.readdir(src, { withFileTypes: true }, (err, files) => {
    if (err) throw err;
    fs.writeFile(path.join(target, `${name}`), '', (err) => {
      if (err) throw err;
    })
    files.forEach((file) => {
      let wholeData = [];
      if (file.isFile() && path.extname(file.name) === '.css') {
        const stream = fs.createReadStream(path.join(src, file.name), 'utf-8'); 
        stream.on('data', (data) => {
          wholeData.push(data);
        });
        stream.on('end', () => {
          fs.appendFile(path.join(target, `${name}`), wholeData.join('\n'), 'utf-8', (error) => {
            if (error) throw error;
          });
        })
      }
    });
  });
}

mergeFiles(srcDir, targetDir, 'bundle.css');
