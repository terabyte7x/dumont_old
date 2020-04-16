import https from 'https';
import fs from 'fs';
import app from './app';

https
  .createServer(
    {
      key: fs.readFileSync('./src/keys/key.pem'),
      cert: fs.readFileSync('./src/keys/cert.pem'),
      passphrase: 'Dumont',
    },
    app
  )

  .listen(3333);
