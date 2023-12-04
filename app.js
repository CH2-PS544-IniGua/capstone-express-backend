const express = require('express');
const db = require('./services/db');
const routeUser = require("./routes/routeUser");
const routeRestaurant = require("./routes/routeRestaurant");
const routeTransactions = require("./routes/routeTransactions");
const routeMenu = require("./routes/routeMenu");

const app = express();
var cors = require('cors')
const port = 3000;

app.use(express.json());
app.use(cors())
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/user", routeUser);
app.use("/restaurant", routeRestaurant);
app.use("/transaction", routeTransactions);
app.use("/menu", routeMenu);

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

