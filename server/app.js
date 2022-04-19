require('./config/connection');

const express = require('express');
const app = express();

//middlewares
app.use(express.json());

//config
app.set('port',3000);

//routes
app.use('/api',require('./routes'));


app.listen(app.get('port'),() => {
    console.log('listening on port',app.get('port'));
});

