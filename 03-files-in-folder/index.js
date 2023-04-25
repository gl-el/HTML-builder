const stdout = process;
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'secret-folder');

fs.readdir(dir, { withFileTypes: true }, (err, files) => {
  if (err) console.log(err);
  files.forEach((file) => {
    if (file.isFile()) {
      fs.stat(`${path.join(dir, file.name)}`, (err, stats) => {
        if (err) console.log(err);
        const size = stats.size;
        const type = path.extname(file.name).slice(1);
        const name = path.basename(path.join(dir, file.name), `.${type}`);
        console.log(`${name} - ${type} - ${size}b`);
      })
    }
  });
})
  