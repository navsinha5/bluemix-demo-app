const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');


var app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(require('./routes'));

app.use((req, res, next) => {
    let err = new Error('not found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        'error': {
            message: err.message,
            error: err
        }
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
