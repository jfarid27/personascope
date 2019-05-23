module.exports = {
  apps: [{
    name: 'pscope-server',
    script: './server.js',
    instances: 1,
    watch: ['./server.js', './api'],
    env: {
      MONGODB_URI: 'mongodb://localhost:27017',
      MONGODB_DB: 'pscope',
      PORT: 3000,
      NODE_ENV: 'development',
    },
    env_production: {
      PORT: 80,
      MONGODB_DB: 'heroku_4ltrs269',
      NODE_ENV: 'production',
    },
  }],
};
