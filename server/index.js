'use strict';
const Hapi = require('@hapi/hapi');
const redis = require('redis');
const client = redis.createClient();
const { promisify } = require("util");
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

client.on("error", function (error) {
  console.error(error);
});

const init = async () => {

  const server = Hapi.server({
    port: 3001,
    host: 'localhost'
  });

  server.route({
    method: 'GET',
    path: '/api/v1/key/{id}',
    handler: (req, h) => {
      return getAsync(req.params.id).then(res => {
        console.log(res)
        client.del(req.params.id)
        return res
      }).catch(err => {
        console.error(err)
        return err
      });
    }

  })

  server.route({
    method: 'post',
    path: '/api/v1/key',
    handler: (req, h) => {
      return setAsync(req.payload.hash, req.payload.key, 'EX', req.payload.expiry).then(res => {
        if (res == null || !res) {
          return h.response('Key deleted').code(404)
        }
        return res
      }).catch(err => {
        console.error(err)
        return err
      })
    }

  })

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

  console.log(err);
  process.exit(1);
});

init();
