const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  return res.status(200).send({ message: 'Hello Docker!' });
});

const PORT = process.env.PORT || 6000;

const server = app.listen(PORT, () => {
  console.log(`Express serverr listening on port: ${PORT}`);
});

// quit on ctrl-c when running docker in terminal
process.on('SIGINT', function onSigint() {
  console.info('Got SIGINT (aka ctrl-c in docker). Graceful shutdown ', new Date().toISOString());
  shutdown();
});

// quit properly on docker stop
process.on('SIGTERM', function onSigterm() {
  console.info('Got SIGTERM (docker container stop). Graceful shutdown ', new Date().toISOString());
  shutdown();
});

// shut down server
const shutdown = () => {
  // NOTE: server.close is for express based apps
  // If using hapi, use `server.stop`
  server.close(function onServerClosed(err) {
    if (err) {
      console.error(err);
      process.exitCode = 1;
    }
    process.exit();
  });
};
