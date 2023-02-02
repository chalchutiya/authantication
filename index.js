const { json } = require('body-parser');
const express = require('express');
const credential = require('./app/controllers/crd_manage')

const port = process.env.port || 3000;

const cors = require('cors');
const { prototype } = require('events');
const app = express()
app.use(express.json());
app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}))


// this is for get all the data

app.get('', async (req, resp) => {
    allcds = await credential.getcds();
    resp.send(allcds);
})

//// Creating a New User /////
app.post('/newuser', async (req, resp) => {
    console.log(req.body);
    if (req.body.username.length == null || req.body.password == null || (req.body.username.length < 4) || (req.body.password.length < 4))
        resp.send("New User is not Created \nUserName or Password not Valid (minimum lenght should be 4)");
    else {
        const result = await credential.setcds(req.body.username, req.body.password);
        resp.send(result);
    }
})

app.post('/login', async (req, resp) => {
    console.log(req.body);
    if (req.body.username.length == null || req.body.password == null || (req.body.username.length < 4) || (req.body.password.length < 4))
        resp.send("Invalid Cridentials", 401);
    else {
        const result = await credential.verifycds(req.body.username, req.body.password);
        resp.send(result.message, result.sc);
    }
})


app.listen(port, () => {
    console.log(`app is listening on port: ${port}`);
});