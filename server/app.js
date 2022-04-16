const express = require('express');
const app = express();

app.use(express.json());



app.get('/', (req, res) => {
    res.send("Hello world!");
})

app.post('/login', (req, res) => {
    console.log(req.body);
    res.send("<b>Login</b>");
})

app.listen(3000,() => {
    console.log('listening on port 3000');
});