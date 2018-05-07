// ESEMPIO: Basic authentication
// HTTP Basic authentication è un sistema basato su header HTTP per l'autenticazione
// di utenti (in particolare tramite un browser web).
// È un sistema piuttosto vecchio (RFC 7617) utilizzato raramente per gli evidenti
// limiti in termini di sicurezza e di esperienza utente.
// Più informazioni: https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication
//
// Una risposta HTTP del server, con stato HTTP 401 (Unauthorized), viene decorata
// con un header "WWW-Authenticate". Il browser visualizzerà quindi un pannello di login
// standard, che permette di fornire login e password.
// Le credenziali dell'utente vengono codificate come stringa (nella forma
// "nome utente:password") e trasformate in base64. Il risultato viene trasmesso al server
// tramite il header HTTP "Authorization".
// Il server può risalire alle credenziali originali e quindi verificare l'identità.

const express = require('express');
const app = express();

app.get('/', function(req, res) {
  res.send('Hello world! Try to access /secret...');
});

function attemptAuth(req) {
  if(!req.headers.authorization) {
    return false;
  }
  console.log("Auth header: " + req.headers.authorization);

  if(!req.headers.authorization.startsWith('Basic ')) {
    // Non stiamo utilizzando HTTP Basic auth
    return false;
  }

  // Decodificare la stringa base64 inviata dal browser
  const authString = req.headers.authorization.substr(6);
  const decodedString = new Buffer(authString, 'base64').toString();
  const [login, password] = decodedString.split(':');

  console.log("Login: " + login + ", password: " + password);

  if(login == 'utente' && password == 'password') {
    // Qui il controllo delle credenziali dovrebbe essere basato
    // su un sistema più complesso...
    return true;
  }

  return false;
}

app.get('/secret', (req, res) => {
  if(!attemptAuth(req)) {
    res.set("WWW-Authenticate", "Basic realm=\"My super secret API\"")
      .sendStatus(401)
      .end();
    return;
  }

  res.status(200).send("This is a top-secret document!");
});

var server = app.listen(process.env.PORT);
