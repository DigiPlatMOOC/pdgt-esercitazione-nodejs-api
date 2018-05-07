// ESEMPIO: Cookie authentication
// I cookie HTTP (RFC 6265) sono un meccanismo molto semplice che permette ad un client
// HTTP di "mantenere lo stato" di una conversazione tramite HTTP.
// Il server può trasmettere un cookie (una semplice stringa di testo) al client, tramite
// il header "Set-Cookie". Una volta impostato, il client si impegna a trasmettere il
// cookie ad ogni singola richiesta, all'interno di un header "Cookie".
// È possibile sfruttare i cookie per mantenere traccia di un precendete login dell'utente
// e successivamente andare a verificare la presenza del cookie per identificarlo.

const express = require('express');
const app = express();

// Il modulo "cookie-parser" deve essere incluso in package.json e ci permette di leggere
// il contenuto dei cookie all'interno dell'oggetto request
const cookieparser = require('cookie-parser');
app.use(cookieparser());

app.get('/', function(req, res) {
  res.send('Hello world! Try to access /secret...');
});

// Semplice stringa usata come "prova" di login
const secretCookieValue = 'asd123$%!';

function attemptAuth(req, res) {
  console.log("Cookies: " + JSON.stringify(req.cookies));

  if(req.cookies.logintoken == secretCookieValue) {
    // Login già effettuato, cookie corretto presente nella richiesta
    return true;
  }

  if(req.query.username && req.query.password) {
    if(req.query.username == 'utente' && req.query.password == 'password') {
      // Nuovo login effettuato con successo, memorizza come cookie nella risposta
      res.cookie('logintoken', secretCookieValue);
      return true;
    }
  }

  return false;
}

app.get('/login', (req, res) => {
  if(attemptAuth(req, res)) {
    // Login effettuato con successo
    res.send('Logged in! Try to logout on /logout');
    return;
  }

  // Login non effettuato
  res.send('Provide login and password information via querystring');
});

app.get('/logout', (req, res) => {
  // Rimuoviamo il cookie, se presente
  res.clearCookie('logintoken').send("You are logged out");
});

app.get('/secret', (req, res) => {
  // Costringiamo il client a non mettere in cache la risposta, in modo da rinnovarla
  // ad ogni richiesta e verificare il cookie di login
  // Provare a rimuovere questo header della risposta per vedere come un cambio di stato
  // (login o logout) può essere ignorato dal browser perché la risposta precedente viene
  // mantenuta in cache
  res.set('Cache-Control', 'no-store');

  if(!attemptAuth(req, res)) {
    // Lo status #301 ed il header "Location" redirigono il browser verso un altro metodo
    // in maniera automatica
    res.status(301).set('Location', '/login').send('Please login first!');
    return;
  }

  res.status(200).send("This is a top-secret document!");
});

var server = app.listen(process.env.PORT);
