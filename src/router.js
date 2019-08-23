const path = require('path');
const fs = require('fs');
const Router = require('@koa/router');

const { convertOfficeToPdf, tryUnlink } = require('./lib');

const router = new Router();

const indexContent = fs.readFileSync(path.join(__dirname, '../public/index.html'), 'utf8');

router.get('/', (ctx) => {
  ctx.body = indexContent;
});

router.post('/office2pdf', async (ctx, next) => {
  if (!ctx.request.files || !ctx.request.files.file) {
    ctx.body = 'no file selected';
    ctx.status = 400;
  }

  const extReg = /.(ppt|doc|xls)x?$/i;
  const fileObj = ctx.request.files.file;

  if (!extReg.test(fileObj.name)) {
    ctx.body = 'invalid file format';
    ctx.status = 400;
    tryUnlink(fileObj.path);
    return;
  }

  try {
    const result = await convertOfficeToPdf(fileObj.path, fileObj.name);
    ctx.set('Content-Type', 'application/pdf');
    ctx.body = result;
  } catch (e) {
    ctx.body = 'convert failed';
    ctx.status = 400;
    console.log(e);
  }
});

module.exports = router;
