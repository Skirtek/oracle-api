const express = require("express");
const axios = require("axios");

const app = express();

const baseApi = axios.create();

app.use(express.json());

app.get("/", function (req, res) {
  return res.send("Oracle API works");
});

app.get("/version", function (req, res) {
  return res.send("Version: 1.0.0");
});

app.post("/backup", async (req, res) => {
  try {
    const data = req.body;

    const result = await baseApi.post("https://rbd-postgresql.herokuapp.com/historicalData/add", { data });

    res.status(200).send("Status OK");
  } catch (err) {
    res.status(500);
  }
});

app.listen(process.env.PORT || 8080);