const Koa = require('koa');
const Router = require('@koa/router');
const koaBody = require('koa-body');

const router = require('./router');
const app = new Koa();

app.use(koaBody({
  multipart:true
}));

app.use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);

console.log('libre portal running on port 3000...');