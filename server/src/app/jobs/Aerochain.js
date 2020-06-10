import assert from 'assert';
import { MongoClient } from 'mongodb';

/**
 * Aos aviadores que primeiro julgaram este niilista mancebo,
 * dedico a saudosa expectação do que há por vir. Now i've
 * got that feeling once again.
 */

const sha512 = require('js-sha3').keccak512;

class Aerochain {}

Aerochain.prototype.getLastBlock = function () {
  (async function () {
    const client = new MongoClient(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    try {
      await client.connect();
      console.log('Connected correctly to server');

      const db = client.db(process.env.MONGODB_DATABASE);
      const block = await db
        .collection('aerochain')
        .find()
        .sort({ index: -1 })
        .limit(1);

      const arrayBlock = await block.toArray();
      console.log(arrayBlock[0]);
      return arrayBlock[0];
    } catch (err) {
      console.log(err.stack);
    }

    // Close connection
    client.close();
  })();
};

Aerochain.prototype.hashBlock = function (
  previousBlockHash,
  currentBlockData,
  nonce
) {
  const dataAsString = previousBlockHash + nonce + currentBlockData;

  const hash = sha512(dataAsString);

  return hash;
};

Aerochain.prototype.proofOfWork = function (
  previousBlockHash,
  currentBlockData
) {
  let nonce = 0;
  let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
  while (hash.substring(124, 128) !== '0000') {
    nonce++;
    hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
    // console.log(hash);
  }
  return nonce;
};

//-----------------------------------------------------------------
// Persist block in MongoDB5
export default {
  key: 'Aerochain',
  options: { attempts: 3 },
  async handle({ data }) {
    const aerochain = new Aerochain();

    const { aeroInfo } = data;

    (async function () {
      const client = new MongoClient(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      try {
        await client.connect();
        console.log('Connected correctly to server');

        const db = client.db(process.env.MONGODB_DATABASE);
        const cursorBlock = await db
          .collection('aerochain')
          .find()
          .sort({ index: -1 })
          .limit(1);

        // Block
        const lastblock = await cursorBlock.toArray();
        const nonceTry = aerochain.proofOfWork(lastblock[0].hash, aeroInfo);

        const block = await db.collection('aerochain').insertOne({
          index: (await db.collection('aerochain').countDocuments()) + 1,
          timestamp: Date.now(),
          aeroInfo,
          nonce: aerochain.proofOfWork(lastblock[0].hash, aeroInfo),
          hash: aerochain.hashBlock(lastblock[0].hash, aeroInfo, nonceTry),
          previousBlockHash: lastblock[0].hash,
        });

        // // Genesis;
        // const block = await db.collection('aerochain').insertOne({
        //   index: (await db.collection('aerochain').countDocuments()) + 1,
        //   timestamp: Date.now(),
        //   aeroInfo:
        //     "Aos aviadores que primeiro julgaram este niilista mancebo, dedico a saudosa expectação do que há por vir. Now i've got that feeling once again.",
        //   nonce: 42,
        //   hash: 42,
        //   previousBlockHash: 42,
        // });

        assert.equal(1, block.insertedCount);
      } catch (err) {
        console.log(err.stack);
      }

      // Close connection
      client.close();
    })();
  },
};
