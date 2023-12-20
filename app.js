const express = require('express');
const routeUser = require("./routes/routeUser");
const routeHistory = require("./routes/routeHistory");

const app = express();
var cors = require('cors')
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(cors())
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/user", routeUser);
app.use("/history", routeHistory);

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

