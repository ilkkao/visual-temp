const fs = require('fs');
const { Client } = require('pg')
const Koa = require('koa');
const Router = require('koa-router');
const compress = require('koa-compress');
const body = require('koa-body');
const send = require('koa-send');
const ejs = require('ejs');
const moment = require('moment');

const app = new Koa();
const router = new Router();
const pgClient = new Client();

const PORT = 38000;

const indexTemplate = ejs.compile(fs.readFileSync('templates/index.ejs', { encoding: 'utf8' }));
const manifest = JSON.parse(fs.readFileSync('dist/manifest.json', { encoding: 'utf8' }));

app.use(compress());

router.get('/', async (ctx, next) => {
  const res = await pgClient.query('SELECT ts, value FROM temperatures ORDER BY ts desc LIMIT 1');
  const { ts: latestTs, value: latestValue } = res.rows[0];

  const res2 = await pgClient.query('SELECT ts, value FROM temperatures WHERE ts > now() - interval \'1 day\'');
  const history = res2.rows.map(row => ({ time: moment(row.ts).unix(), value: row.value }));

  const res3 = await pgClient.query('SELECT ts, value FROM temperatures ORDER BY value desc LIMIT 1');
  const res4 = await pgClient.query('SELECT ts, value FROM temperatures ORDER BY value asc LIMIT 1');
  const { ts: highestEverTs, value: highestEverValue } = res3.rows[0];
  const { ts: lowestEverTs, value: lowestEverValue } = res4.rows[0];

  ctx.body = indexTemplate({
    data: {
      latest: {
        value: latestValue,
        ts: moment(latestTs).unix(),
      },
      today: {
        min: {
          value: 4.3,
          ts: 3211212
        },
        max: {
          value: 4.3,
          ts: 3211212
        }
      },
      yesterday: {
        min: {
          value: 4.3,
          ts: 3211212
        },
        max: {
          value: 4.3,
          ts: 3211212
        }
      },
      ever: {
        min: {
          value: moment(lowestEverValue).unix(),
          ts: moment(lowestEverTs).unix()
        },
        max: {
          value: moment(highestEverValue).unix(),
          ts: moment(highestEverTs).unix()
        }
      },
      history
    },
    manifest
  });
});

router.get('/assets/:file', async (ctx, next) => {
  await send(ctx, ctx.params.file, {
    root: 'dist',
    maxage: 200
  });
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
