module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    // First application
    {
      name: 'API',
      script: 'dist/main.js',
      // "node_args": ["--debug=7000"]
      instances: 8,
      exec_mode: 'cluster',
      
    }

  
  ]

 
};
