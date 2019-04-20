const express = require("express");
const fs = require("fs");
const app = express();

let msg1 = "Welcome To Brow N' Brow Salon!";
let msg2 = "Welcome To Brow N' Brow Salon!";

app.set("view engine", "pug");
app.use(express.static('public'))

app.get("/", (req, res) => {
    let data = JSON.parse(fs.readFileSync('prices.json'));
    res.render('index', { data: data, msg1: msg1, msg2: msg2 });
});

app.get("/waxing", (req, res) => {
    let data = JSON.parse(fs.readFileSync('prices.json'));
    res.render('waxing', { data: data, msg1: msg1, msg2: msg2 });
});

app.get("/edit", (req, res) => {
    let data = JSON.parse(fs.readFileSync('prices.json'));
    res.render('edit', {data: data});
});

app.post("/receiver/:name/:price/:tag/:tprice/:sprice", (req, res) => {
    let prices = JSON.parse(fs.readFileSync('prices.json'));
    let j = true;
    for (let i = 0; i < prices.length; i++) {
        if (prices[i].name == req.params.name && prices[i].tag == req.params.tag) {
            prices[i].price = req.params.price;
            prices[i].tprice = req.params.tprice;
            prices[i].sprice = req.params.sprice;
            j = false;
        }
    } if (j) {
        prices.push(req.params);
    } fs.writeFileSync("prices.json", JSON.stringify(prices));
    res.sendStatus(200);
});

app.post("/deceiver/:name/:tag", (req, res) => {
    let prices = JSON.parse(fs.readFileSync('prices.json'));
    for (let i = 0; i < prices.length; i++) {
        if (prices[i].name == req.params.name && prices[i].tag == req.params.tag) {
            prices.splice(i, 1);
        }
    } fs.writeFileSync("prices.json", JSON.stringify(prices));
    res.sendStatus(200);
});

app.post("/changetext/:msg1/:msg2", (req, res) => {
    msg1 = decodeURIComponent(req.params.msg1);
    msg2 = decodeURIComponent(req.params.msg2);
    res.sendStatus(200);
});

app.listen(3000, () => {
    console.log('running!');
});