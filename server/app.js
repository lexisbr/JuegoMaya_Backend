const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

//middlewares
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//config
app.set('port',3000);

//routes
app.use('/users',require('./routes/users'));

app.use('/login',require('./routes/auth'));



app.listen(app.get('port'),() => {
    console.log('listening on port',app.get('port'));
});

