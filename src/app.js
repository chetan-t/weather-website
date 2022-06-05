const express = require("express");
const hbs = require("hbs");
const path = require("path");
const request = require("request");
const app = express();

const port = process.env.PORT || 3000;

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

app.get("/products", (req, res) => {
  if (!req.query.name) {
    res.send({
      error: "You must provide name",
    });
  }
  console.log(req.query.name);
  res.send({
    products: [
      {
        forecast: "it is",
        location: "india",
        name: req.query.name,
      },
    ],
  });
});

app.get("/weather", (req, res) => {
  const geocode = (address, callback) => {
    const base_url =
      "http://api.weatherstack.com/current?access_key=2831626ca39a6a11514aade9bcafb3c8&query='" +
      address +
      "'";
    request({ url: base_url }, (error, response) => {
      if (error) {
        callback("unable to find location service", undefined);
      } else {
        // var weather = JSON.parse(response.body);
        callback(undefined, JSON.parse(response.body));
      }
    });
  };

  geocode("india", (error, data) => {
    console.log("Error", error);
    console.log("Data", data);

    res.send({
      forecast: [
        {
          country: data.location.country,
          latitude: data.location.lat,
          longitude: data.location.lon,
          datetime: data.location.locattime,
        },
      ],
    });
  });
});

app.listen(port, () => {
  console.log("Server running on port" + port);
});
