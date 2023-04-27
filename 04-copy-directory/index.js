const stdout = process;
const fs = require('fs');
const path = require('path');
const targetDir = path.join(__dirname, 'files-copy');
const srcDir = path.join(__dirname, 'files');

async function copyDir(src, target) {
  await fs.promises.rm(target, { force: true, recursive: true });
  await fs.promises.mkdir(target);
  const files = await fs.promises.readdir(src, { withFileTypes: true })
  for (file of files) {
    if (file.isFile()) {
      fs.copyFile(path.join(src, file.name), path.join(target, file.name), (err) => {
        if (err) console.log(err);
      });
    }
  }
}

copyDir(srcDir, targetDir);