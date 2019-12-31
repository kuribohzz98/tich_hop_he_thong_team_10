const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const config = require("./config/config.js");
const axios = require("axios");
const handler = require("./public/handler");
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "views");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Content-Type", "application/json");
    next();
});

var drive_token = "";

const axiosInstance = axios.create({
    baseURL: 'http://0.0.0.0:8080'
})

// const axiosInstanceDrive = axios.create({
//     baseURL: 'http://0.0.0.0:8088'
// })

app.listen(process.env.PORT || config.PORT, () => {
    console.log(`Server listening at port ${process.env.PORT || config.PORT}`)
});

app.get('/', (req, res, next) => {
    res.render('index');
})

app.all('/trello/webhook', async (req, res, next) => {
    res.status(200).send('hello trello');
    if (!req.body.action) {
        return;
    }
    axiosInstance.post('/api/trello/webhook', req.body);
    next();
})

app.post('/slack_command_trello', (req, res, next) => {
    console.log(req.body);
    res.status(200).send();
    axiosInstance.post("/api/slack_command_trello", req.body);
    next();
})

app.post('/api/interactivity_component', async (req, res, next) => {
    const result = await axiosInstance.post("/api/interactivity_component", req.body.payload);
    if (!result.data) {
        res.status(200).send();
        return;
    }
    res.status(200).json(result.data);
    next();
})

app.post('/api/select_menu', async (req, res, next) => {
    let filter = JSON.parse(req.body.payload);
    const data = await axiosInstance.post('/api/select_menu', req.body.payload);
    res.status(200).json(handler.renderSelectOption(filter.action_id.includes("drive") ? data.data.items : data.data));
    next();
})


app.post('/drive/listen_token', async (req, res, next) => {
    console.log(req.body);
    drive_token = req.body.token;
    res.status(200).send();
})

app.post('/slack_comment_drive', async (req, res, next) => {
    res.status(200).send();
    axiosInstance.post("/api/slack_command_drive", req.body);
    next();
})

app.all('/drive_webhook/:a', (req, res, next) => {
    res.send('google-site-verification: google8e56de1dfb03a2a1.html');
    next();
})

app.post('/drive_webhook/subcribe/zzz', async (req, res, next) => {
    const data = await axios.get(req.headers['x-goog-resource-uri'], {headers: {"Authorization": "Bearer " + drive_token}});
    axiosInstance.post("/api/drive_subcribe", { file: data.data.changes[data.data.changes.length - 1] });
    res.status(200).send('');
    next();
})
