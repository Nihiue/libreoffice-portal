const path = require('path');
const fs = require('fs');
const child_process = require('child_process');

function randomStr() {
  return `libre_portal_${Math.ceil(Date.now() / 1000).toString(36)}${Math.ceil(1679616 * Math.random()).toString(36)}`;
}

function libreConvert(source, outdir) {
  return new Promise((resolve, reject) => {
    const shell = child_process.spawn('libreoffice', [
      '--headless',
      '--invisible',
      '--convert-to',
      'pdf',
      '--outdir',
      outdir,
      source
    ]);

    let rawData = '';

    shell.stdout.on('data', function (data) {
      rawData = rawData + data;
    });

    shell.on('error', function (e) {
      reject();
    });

    shell.on('exit', function (code, signal) {
      console.log(rawData.trim());
      if (code === 0) {
        resolve();
      } else {
        reject();
      }
    });
  });
}

function tryUnlink(filePath) {
  try {
    fs.unlinkSync(filePath);
    return true;
  } catch (e) {
    console.log('unlink failed', filePath);
    return false;
  }
}

async function convertOfficeToPdf(filePath, origName) {
  const tmpDir = '/tmp';
  const batchId = randomStr();

  const inputFile = path.join(tmpDir, `${batchId}${path.extname(origName)}`);
  const outputFile = path.join(tmpDir, `${batchId}.pdf`);
  const now = Date.now();
  try {
    fs.renameSync(filePath, inputFile);
    await libreConvert(inputFile, tmpDir);
    const ret = fs.readFileSync(outputFile);
    console.log(`time: ${Date.now() - now}ms`);
    return ret;
  } catch (e) {
    throw e;
  } finally {
    tryUnlink(inputFile);
    tryUnlink(outputFile);
  }
}

module.exports = {
  convertOfficeToPdf,
  tryUnlink
};