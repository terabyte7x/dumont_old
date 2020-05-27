import 'dotenv/config';
import https from 'https';
import fs from 'fs';
import { errors } from 'celebrate';
import Bullboard from 'bull-board';
import app from './app';
import Queue from './app/lib/Queue';

app.use(errors());

Bullboard.setQueues(Queue.queues.map((queue) => queue.bull));

app.use('/admin/queues', Bullboard.UI);

app.listen(3333);

https
  .createServer(
    {
      key: fs.readFileSync('./src/keys/key.pem'),
      cert: fs.readFileSync('./src/keys/cert.pem'),
      passphrase: 'Dumont',
    },
    app
  )
  .listen(3434);
