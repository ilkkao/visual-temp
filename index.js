const { Client } = require('pg')
const Koa = require('koa');
const Router = require('koa-router');
const body = require('koa-body');

const app = new Koa();
const router = new Router();
const pgClient = new Client();

const PORT = 38000;

router.get('/', async (ctx, next) => {
  const res = await pgClient.query('SELECT ts, value FROM temperatures ORDER BY ts desc LIMIT 1');
  const { ts, value } = res.rows[0];

  ctx.body = `<h1>Temperature: ${value}</h1><p>${ts}`;
});

router.get('/latest.json', async (ctx, next) => {
  ctx.set('Cache-control', 'private, max-age=0, no-cache');

  const res = await pgClient.query('SELECT MAX(ts) FROM temperatures');
  let highestTs = 0;

  if (res.rows) {
    highestTs = new Date(res.rows[0].max) / 1000;
  }

  ctx.body = {
    ts: highestTs
  };
});

router.post('/temperatures.json', body(), async (ctx, next) => {
  const data = ctx.request.body.values;

  for (const sample of data) {
    const ts = sample[1];
    const value = sample[0];

    const date = new Date(0);
    date.setUTCSeconds(ts);

    const res = await pgClient.query(`INSERT INTO temperatures (ts, value) VALUES ($1, $2)`, [ date.toISOString(), value ]);
  }

  ctx.body = {
    result: 'ok'
  };
});

(async () => {
  await pgClient.connect()

  app.use(router.routes());
  app.use(router.allowedMethods());

  app.listen(PORT, () => {
    console.log(`Listening port: ${PORT}`);
  });
})();
