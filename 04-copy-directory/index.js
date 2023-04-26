const stdout = process;
const fs = require('fs');
const path = require('path');
const targetDir = path.join(__dirname, 'files-copy');
const srcDir = path.join(__dirname, 'files');

fs.access(targetDir, (err) => {
  if (err) fs.mkdir(targetDir, (err) => { 
    if (err) throw err;
  });
  fs.readdir(targetDir, (err, files) => {
    if (err) throw err;
    files.forEach((file) => {
      fs.unlink(path.join(targetDir, file), (err) => {
        if (err) throw err;
      });
    })
  })
  fs.readdir(srcDir, { withFileTypes: true }, (err, files) => {
    if (err) throw err;
    files.forEach((file) => {
      if (file.isFile()) {
        fs.copyFile(path.join(srcDir, file.name), path.join(targetDir, file.name), (err) => {
          if (err) throw err;
        });
      }
    });
  })
}); 