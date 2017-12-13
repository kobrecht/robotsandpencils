var http = require('http');
var url = require('url');
var Deck = require('./deck');

/* Current deck. Exists so that shuffle and dealOne effects can be persisted for the life of the server. */
var deck = new Deck();

/* Serve the deck to a web client. */
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});

    var method = url.parse(req.url).pathname;
    if (method === '/shuffle') deck.shuffle();
    else if (method === '/dealOne') res.write(deck.dealOne().toString());
    else if (method === '/peek') res.write(deck.toString());
    else {
        res.write('Usage:<br/>');
        res.write(' &nbsp; /shuffle - Reorder the cards randomly<br/>');
        res.write(' &nbsp; /dealOne - Deal the top card off the deck<br/>');
        res.write(' &nbsp; /peek - Look through the deck');
    }

    res.end();
}).listen(8083);
