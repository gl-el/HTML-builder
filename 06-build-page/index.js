const fs = require('fs');
const path = require('path');
const stylesDir = path.join(__dirname, 'styles');
const componentsDir = path.join(__dirname, 'components');
const assetsDir = path.join(__dirname, 'assets');
const targetDir = path.join(__dirname, 'project-dist');
const template = path.join(__dirname, 'template.html');

const reg = /{{([^}]+)}}/g;

async function copyDir(src, target) {
  await fs.promises.rm(target, { force: true, recursive: true });
  await fs.promises.mkdir(target);
  const files = await fs.promises.readdir(src, { withFileTypes: true })
  for (file of files) {
    if (file.isFile()) {
      fs.copyFile(path.join(src, file.name), path.join(target, file.name), (err) => {
        if (err) throw err;
      });
    }
  }
}

function mergeFiles(src, target, name) {
  fs.readdir(src, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.log(err);
    }
    fs.writeFile(path.join(target, `${name}`), '', (err) => {
      if (err) {
        console.log(err.message);
      }
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
            if (err) {
              console.log(err.message);
            }
          });
        })
      }
    });
  });
}

async function check(text) {
  const regex = /{{([^}]+)}}/g;
  const matches = [...text.matchAll(regex)];
  const tags = {}
  matches.map((subArr) => {
    tags[subArr[0]] = subArr.index;
  })
  for (const key in tags) {
    try {
      const insertion = await fs.promises.readFile(path.join(componentsDir, `${key.slice(2, -2)}.html`), 'utf-8');
      text = text.replace(key, insertion);
    } catch (err) {
      console.log(`add template file for ${key}`);
    }

  }
  return text;
}

async function build() {
  fs.mkdir(targetDir, { recursive: true }, (err) => {
    if (err) throw err;
  });
  const text = await fs.promises.readFile(template, 'utf-8');
  const inserted = await check(text);
  fs.writeFile(path.join(targetDir, 'index.html'), inserted, 'utf-8', (error) => {
    if (error) throw error;
  });
  mergeFiles(stylesDir, targetDir, 'style.css');
  fs.readdir(assetsDir, { withFileTypes: true }, (err, files) => {
    if (err) console.log(err);
    files.forEach((file) => {
      fs.mkdir(path.join(targetDir, 'assets'), { recursive: true }, (err) => {
        if (err) throw err;
      });
      if (file.isDirectory) {
        copyDir(path.join(assetsDir, file.name), path.join(targetDir, 'assets', file.name));
      }
    });
  });
}


build()