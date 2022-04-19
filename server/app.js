const express = require('express');
const app = express();


app.set('appName','JuegoMaya');
app.set('port',3000);
app.set('view engine','ejs');


//middlewares
app.use(express.json());

app.get('/', (req, res) => {
    const data = [
        {name:"test1"},
        {name:"test2"},
    ];
    res.render('index.ejs',{personas: data});
})


app.post('/login', (req, res) => {
    console.log(req.body);
    res.send("<b>Login</b>");
})

//app.use(express.static('public'));

app.listen(app.get('port'),() => {
    console.log(app.get('appName'));
    console.log('listening on port',app.get('port'));
});

