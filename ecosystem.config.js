module.exports = {
  apps: [{
    name: 'steamid',
    script: 'app.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development',
    },
    env_production: {
      NODE_ENV: 'production',
    },
  }],
  deploy: {
    production: {
      user: 'deploy',
      host: ['gcp.ewenjo.pro'],
      ref: 'origin/master',
      repo: 'git@github.com:ewenjo/steamid64.git',
      path: '/home/deploy/deployments/steamid',
      'post-deploy': 'npm install; ln -sf ~/.secrets/env/steamid .env; pm2 startOrReload ecosystem.config.js --update-env --env production',
    },
  }
};
