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
      image: 'zodern/meteor:root'
    },
    servers: {
      one: {}
    },
    buildOptions: {
      serverOnly: true
    },
    env: {
      ROOT_URL: 'https://elliottro.com',
      MONGO_URL: 'mongodb://localhost/meteor'
    },
    enableUploadProgressBar: true
  },

  mongo: {
    version: '3.4.1',
    servers: {
      one: {}
    }
  },

  proxy: {
    domains: 'elliottro.com,www.elliottro.com',
    ssl: {
      letsEncryptEmail: 'yuri.fabris@gmail.com',
      forceSSL: true
    }
  }
};
