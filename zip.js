const zipdir = require('zip-dir');
const filesize = require('filesize');
const fs = require('fs');

function getFilesizeInBytes(filename) {
  const stats = fs.statSync(filename);
  const fileSizeInBytes = stats['size'];
  return fileSizeInBytes;
}

zipdir('./dist', { saveTo: './magic.zip' }, function(err, buffer) {
  const size = getFilesizeInBytes('./magic.zip');

  console.log(`Build size: ${filesize(size)}`);
});
