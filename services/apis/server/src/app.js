const express = require('express');
const app = express();

const { PORT = 8080 } = process.env;

app.use(express.json());

app.use('/ping', (_, res) =>
  res.status(200).send({
    version: require('../../package.json').version,
  })
);

app.use((_, res) => res.status(404).send({ error: 'Not Found' }));

app.listen(PORT, () => {
  console.info(`Comp APIs -> Listening on port ${PORT}`);
});

module.exports = app;
