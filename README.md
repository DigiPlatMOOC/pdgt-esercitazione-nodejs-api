# Esercitazione API con NodeJS

Questa esercitazione non richiede lo scaricamento della repository, né l’installazione o l’esecuzione di codice in locale, bensì si appoggia al servizio online Glitch.com per la realizzazione di un semplice servizio Web, che sia automaticamente subito disponibile online.

Non è prevista la consegna del codice, ma si consiglia di effettuare degli esperimenti sulla base del codice fornito, in modo tale da prendere dimestichezza con la scrittura di codice lato server e NodeJS+Express.

## Procedura

1. Accedere al [progetto d’esempio su Glitch](https://glitch.com/edit/#!/pdgt-nodejs-api) e cliccare su "Remix this",
1. Aprire il file `server.js`,
1. Prendere in esame il codice presente e, in particolare, studiare:
    1. Come avviene la specifica dei vari metodi previsti dalle API (tramite le varie chiamate `app.get` e `app.post`),
    1. Come viene effettuato il *pattern matching* da parte di Express, in particolare per la risoluzione dei parametri direttamente dal percorso (ad esempio, nel metodo al percorso `/person/:name`, dove `:name` è il parametro al quale si accede poi tramite `req.params.name`),
    1. Come viene impostato lo status&nbsp;HTTP tramite la funzione `res.status()`,
    1. Come è possibile operare su dati presenti in memoria (in particolare l’array `numbers`).

Leggere la [documentazione di Express per NodeJS](https://expressjs.com/en/api.html).

## Consegna

Di seguito alcune esercitazioni di prova:

- [ ] Sostituire tutte le risposte del server con testo semplice (ad esempio al metodo `GET /person`) con un oggetto JSON che possa aver senso per un eventuale client dell’API,
- [ ] Visto che i dati in memoria vengono persi quando il server&nbsp;NodeJS viene riavviato (ad ogni modifica del codice), usare il [modulo "File System" di NodeJS](https://nodejs.org/api/fs.html#fs_file_system) per scrivere e leggere l’array su disco quando necessario,
- [ ] Usare il [modulo "HTTP" di NodeJS](https://nodejs.org/api/http.html#http_http) per inviare richieste HTTP e quindi sfruttare Google&nbsp;Firebase come database esterno tramite la sua API HTTP (fare riferimento all’[esercitazione relativa](https://github.com/DigiPlatMOOC/pdgt-esercitazione-firebase)).
