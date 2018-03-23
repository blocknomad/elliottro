module.exports = {
  servers: {
    one: {
      host: '54.82.165.27',
      username: 'ubuntu',
      pem: '~/Documents/dev/Gagarin/Elliottro-PRE-ALPHA01.pem'
    }
  },
  meteor: {
    name: 'Elliottro',
    path: '../',
    docker: {
      image: 'abernix/meteord:node-8.4.0-base'
    },
    servers: {
      one: {}
    },
    buildOptions: {
      serverOnly: true
    },
    env: {
      ROOT_URL: 'http://elliottro.com',
      MONGO_URL: 'mongodb://localhost/meteor'
    }
  },
  mongo: {
    version: '3.4.1',
    servers: {
      one: {}
    }
  }
};
