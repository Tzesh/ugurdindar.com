const next = require('next');
const https = require('https');
const dotenv = require('dotenv');
const fs = require("fs");

// configure environment variables
dotenv.config();
const hostname = 'localhost'
const port = 443
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, hostname, port });
const sslLocation = process.env.SSL_LOCATION;

const sslOptions = {
  key: fs.readFileSync(sslLocation + "privkey.pem"),
  cert: fs.readFileSync(sslLocation + "cert.pem"),
  ca: fs.readFileSync(sslLocation + "chain.pem")
};

const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = https.createServer(sslOptions, (req, res) => {
    // custom api middleware
    if (req.url.startsWith('/api')) {
      return handle(req, res);
    } else {
      // Handle Next.js routes
      return handle(req, res);
    }
  });

  server.listen(port, (err) => {
    if (err) throw err
    console.log('> Ready on https://localhost:' + port);
  })
});

