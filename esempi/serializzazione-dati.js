// ESEMPIO
// Mostra come generare diversi tipi di output in formati standard (JSON e XML),
// trasformando oggetti JavaScript nella loro rappresentazione testuale.
// Questo processo è generalmente noto come "serializzazione", mentre la conversione
// inversa (da testo JSON o XML a oggetto in memoria) si chiama "deserializzazione".

// Caricamento moduli
const express = require('express');
const app = express();

// La serializzazione JSON è inclusa in NodeJS, mentre per XML è necessario
// utilizzare un pacchetto esterno: ricordarsi di aggiungere "data2xml" alle dipendenze
// del proprio progetto nel file package.json
const xml = require('data2xml')();

const fibonacci = {
  "numeri": [ 1, 1, 2, 3, 5, 8, 13 ],
  "persona": "Fibonacci",
  "nascita": {
    "luogo": "Pisa",
    "anno": 1175
  }
};

// Hello world
app.get('/', function(req, res) {
  res.type('text/plain').send("Ciao!");
});

app.get('/json', (req, res) => {
  res.type('application/json');
  res.send(JSON.stringify(fibonacci));
});

app.get('/xml', (req, res) => {
  res.type('application/xml');
  res.send(xml('fibonacci', fibonacci));
});

const server = app.listen(process.env.PORT, function() {
  console.log("Connecting to client");
});
