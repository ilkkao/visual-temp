const Koa = require('koa');

const app = new Koa();

const PORT = 38000;

app.use(async ctx => {
  ctx.body = 'Visual temp';
});

app.listen(PORT);

console.log(`Listening port: ${PORT}`);
