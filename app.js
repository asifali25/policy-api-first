const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());

const policies = JSON.parse(fs.readFileSync(`${__dirname}/policy-data.json`));
const homePage = fs.readFileSync(`${__dirname}/index.html`);

app.get("/", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(homePage);
});

app.get("/api", (req, res) => {
  res.status(200).json({
    status: "success",
    results: policies.length,
    data: {
      polices: policies,
    },
  });
});

app.get("/api/:id", (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const policy = policies.find((el) => el.id === id);

  if (!policy) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid Id",
    });
  }

  res.status(200).json({
    status: "sucess",
    data: {
      policy: policy,
    },
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App Running on port ${port}`);
});
