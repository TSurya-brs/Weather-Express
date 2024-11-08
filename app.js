const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const port = 9000;

const app = express();

app.use(express.static("public"));
app.use(cors());

app.get("/weather", async (req, res) => {
  const city = req.query.city;
  console.log(`In Backend ${city}`);
  const api_key = "60bbd59ec7556e88c0f6b5a2080aebaa";

  const api_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;

  const response = await fetch(api_url);
  try {
    if (!response.ok) {
      res.status(404).json({ error: "City not found" });
      return;
    }
    const data = await response.json();
    console.log("Data fetched from api and sending to frontend");
    res.status(200).send(data);
  } catch (error) {
    res
      .status(500)
      .send({ error: "City not Found in the api sending same to frontend" });
  }
});

app.listen(port, () => {
  console.log(`Server connected to ${port}`);
});
