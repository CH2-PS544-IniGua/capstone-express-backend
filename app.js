const express = require('express');
const routeUser = require("./routes/routeUser");

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

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

