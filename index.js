const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

const PORT = 38000;

router.get('/', (ctx, next) => {
  ctx.body = 'online';
});

router.get('/latest.json', (ctx, next) => {
  ctx.body = {
    ts: 0
  };
});

router.post('/temperatures.json', (ctx, next) => {
  ctx.body = {
    result: 'ok'
  };
});

router.get('/get')

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT);

console.log(`Listening port: ${PORT}`);
