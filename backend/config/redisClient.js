const { createClient } = require('redis');

let client;

const getRedisClient = async () => {
  if (!client) {
    client = createClient({
      username: 'default',
      password: 'tJIMNxd1xp4u77Kf5CcFxYBC1Dz1TiJF',
      socket: {
        host: 'redis-11449.c10.us-east-1-3.ec2.cloud.redislabs.com',
        port: 11449
      }
    });

    client.on('error', err => console.log('Redis Client Error', err));

    await client.connect();
    console.log("Connected to Redis successfully! ✅");
  }

  return client;
};

module.exports = {
  getRedisClient
}