// ESEMPIO
// Mostra come ricevere dati (in 4 modi diversi, ossia: query string,
// parametri di percorso, header nella richiesta HTTP e corpo della
// richiest HTTP).

// Caricamento moduli
const express = require('express');
const app = express();

// Questo modulo è necessario per riceveri dati in formato JSON
// nel "corpo" delle richieste HTTP, in request.body.
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Hello world
app.get('/', function(req, res) {
  res.type('text/plain').send("Ciao!");
});

// Nome attraverso query string (vedi req.query.name)
app.get('/person', function(req, res) {
  if(req.query.name) {
    res.type('text/plain').send("Il nome è " + req.query.name);
  }
  else {
    res.sendStatus(400);
  }
});

// Nome attraverso header HTTP
app.get('/person/header', function(req, res) {
  // Per creare una richiesta HTTP con un header custom è necessario utilizzare
  // un client come ad esempio PostMan
  if(req.headers['name']) {
    res.type('text/plain').send("Il nome è " + req.headers['name']);
  }
  else {
    res.sendStatus(400);
  }
});

// Nome attraverso corpo della richiesta
app.post('/person/body', function(req, res) {
  // Nota bene: questo metodo è POST perché, per convenzione, metodi HTTP con
  // verbo GET non prevedono la presenza di un body

  // Questo metodo si aspetta il seguente corpo della richiesta (in formato JSON):
  // { "name": "Mario Rossi" }
  // Eventuali altre proprietà dell'oggetto JSON vengono ignorati
  if(req.body.name) {
    res.type('text/plain').send("Il nome è " + req.body.name);
  }
  else {
    res.sendStatus(400);
  }
});

// Nome come parametro nel percorso
app.get('/person/:name', (req, res) => {
  // Nota bene: qui il parametro "name" non può non essere impostato
  // essendo parte del percorso (ossia, se non fosse presente non verrebbe
  // invocato questo metodo)
  res.type('text/plain').send("Il nome è " + req.params.name);
});

const server = app.listen(process.env.PORT, function() {
  console.log("Connecting to client");
});
