const { stdout } = process;
const fs = require('fs');
const path = require('path');
const stream = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');
let wholeData = '';
stream.on('data', (data) => {
  wholeData += data;
})
stream.on('end', () => {
  stdout.write(`${wholeData}`);
})
