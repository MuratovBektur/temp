const express = require("express");
const app = express();
const rootRouter = require("./routers/rootRouter");
const PORT = process.env.PORT ?? 5000;

app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

const start = () => {
  try {
    app.use("/api", rootRouter);
    app.listen(PORT, () => console.log(`server runned on port:${PORT}`));
  } catch (e) {
    console.error(e);
  }
};

start();
