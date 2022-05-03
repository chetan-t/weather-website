const express = require("express");
const hbs = require("hbs");
const path = require("path");

const app = express();

//define path for express configuration
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../template/views");
const partialPath = path.join(__dirname, "../template/partials");

//setup handlebar engine
app.set("views", viewsPath);
app.set("view engine", "hbs"); //setting up dynamic pages
hbs.registerPartials(partialPath);

//setup static directory for server
app.use(express.static(publicPath));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/team", (req, res) => {
  res.render("team");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
