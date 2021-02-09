module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    // First application
    {
      name: 'API',
      script: './dist/src/app.js',
      // "node_args": ["--debug=7000"]
      instances: 8,
      exec_mode: 'cluster',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }

  
  ]

 
};
