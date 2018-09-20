const express = require('express');

const app = express();

app.use(express.static(__dirname));

app.configure(() => {
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
});

app.listen(4000);
console.log('Listening on port 4000');