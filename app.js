const express = require("express"); // Framework para la infraestructura web
const fs = require("fs"); // Módulo para trabajar con el sistema de arcvhivos del SO
const http = require("http"); // Para trabajar con el servidor http
const https = require("https"); // Para trabajar con el servidor https
const helmet = require("helmet"); // Ayuda a proteger la aplicación
var compression = require("compression"); // Para comprimir las respuestas
require("dotenv").config(); // Uso y configuración de las variables de entorno
const cors = require("cors"); // Para habilitar CORS (en caso de ser necesario)
const app = express();
app.use(helmet());
app.use(compression());

// Servidor HTTP
const serverHttp = http.createServer(app);
serverHttp.listen(process.env.HTTP_PORT, process.env.IP);
// Opciones para el servidor https, para usar el certificado TLS
const httpsServerOptions = {
  key: fs.readFileSync(process.env.KEY_PATH),
  cert: fs.readFileSync(process.env.CERT_PATH),
};
// Servidor HTTPS
const serverHttps = https.createServer(
  httpsServerOptions,
  app
);
serverHttps.listen(process.env.HTTPS_PORT, process.env.IP);

app.use((req, res, next) => {
  if (req.secure) next();
  else
    res.redirect(`https://${req.headers.host}${req.url}`);
});
