module.exports = {
  apps: [
    {
      name: "A-tracker-api",
      script: "server.js",
      watch: true,
      env: {
        NODE_ENV: "development",
        PORT: 5000
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 5000
      }
    }
  ]
};