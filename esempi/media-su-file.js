// ESEMPIO
// Mostra un semplice esempio di calcolo della media che utilizza un file sul disco
// come memoria (il file "average.json"), che contiene un semplice array di numeri
// in formato JSON.
// Il primo metodo legge i dati e calcola la media (ritornata come oggetto JSON),
// mentre il secondo metodo (con verbo POST) valuta la correttezza del voto e lo
// aggiunge all'array (prima leggendo il file, deserializzandolo, aggiungendo il
// numero e poi scrivendo nuovamente il file in formato JSON).
// L'ultimo metodo ritorna semplicemente il file "average.json" come file semplice.

// Nota bene: in questo esempio si utilizza util.promisify per convertire i metodi
// del modulo 'fs' per l'utilizzo di async/await.
//
// In particolare, la chiamata tradizionale (cosiddetta, a "callback"):
//   fs.readFile('nomefile', 'utf8', function(err, data) {
//     ...
//   }
//
// viene convertito in:
//   data = await util.promisify(fs.readFile)('nomefile', 'utf8');
//
// se il metodo contenente la chiamata await è marcato come "async".
// Questa sintassi più moderna permette di avere programmi per NodeJS più stringati
// e molto più leggibili.

// Caricamento moduli
const express = require('express');
const app = express();
const fs = require('fs');
const util = require('util');

// Hello world
app.get('/', function(req, res) {
  res.type('text/plain').send("Ciao!");
});

// Ritorna la media attuale
app.get('/average', async (req, res) => {
  try {
    const data = await util.promisify(fs.readFile)('average.json', 'utf8');

    // Lettura come oggetto JSON (ritornerà un array di numeri)
    const numbers = JSON.parse(data);

    // Calcolo della media
    var acc = 0.0;
    for(var i = 0; i < numbers.length; ++i) {
      acc += numbers[i];
    }

    // Risultato come oggetto, convertito in JSON
    const risultato = JSON.stringify({
      average: (acc / numbers.length),
      count: numbers.length
    });

    res.type('application/json').send(risultato);
  }
  catch(err) {
    console.log("Errore: " + err);
    res.sendStatus(500);
  }
});

// Send in a vote through a POST request
app.post('/average/:vote', async (req, res) => {
  var vote = Number.parseInt(req.params.vote);
  if(isNaN(vote) || vote == null || vote == undefined) {
    res.sendStatus(400);
    return;
  }

  // Lettura dei numeri
  const data = await util.promisify(fs.readFile)('average.json', 'utf8');
  var numbers = JSON.parse(data);

  numbers.push(vote);

  await util.promisify(fs.writeFile)('average.json', JSON.stringify(numbers), 'utf8');

  res.sendStatus(200);
});

// Ritorna direttamente il file senza interpretarlo
app.get('/show', (req, res) => {
  res.type('application/json').sendFile(__dirname + '/average.json');
});

const server = app.listen(process.env.PORT, function() {
  console.log("Connecting to client");
});
