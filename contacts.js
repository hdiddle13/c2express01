var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({}));
const fetch = require("node-fetch");
app.use(express.json());
// store contacts in an arrays
var contacts = []

const getData = async () => {
  let url = "https://pollysnips.s3.amazonaws.com/users.json";
  try {
    let res = await fetch(url);
    contacts = await res.json();
    //console.log(contacts);
  } catch (error) {
    console.log("error");
  }
 };
 
getData();
app.get("/", function (req, res) {
  res.send("<h1> Goodbye Routes: try POST to /contact and GET /contacts </h1>");
});
// list all contacts
app.get("/contacts", function (req, res) {
  res.json(contacts);
});
// add a contact
app.post("/contact", (req, res) => {
  contacts.push({ name: req.body.name, email: req.body.email });
  res.json(req.body);
});

app.get("/login", (req, res) => {
  // send back a login form
  let form = `<form action="/auth" method="post">
    <label for="name">Enter name: </label>
    <input id="name" type="text" name="name" value="name">
    <input id="password" type="text" name="password" value="password">
    <input type="submit" value="OK">
    </form>`;
  res.send(form);
 });

 app.post("/auth", (req, res) => {
  //  send back OK you are logged in
  let { name, password } = req.body;
  res.send(`Hi ${name} you are logged in`);
  });  

app.listen(3000);
console.log("Running on port 3000");
