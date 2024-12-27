const express = require("express");
const userRouter = require("./modules/user/routes/user_router");
const articleRouter = require("./modules/article/routes/article_router");
const hashTagRouter = require("./modules/hash_tag/routes/hash_tag_router");
const { connectToMonogoDb } = require("./connection");
const { logReqRes } = require("./middlewares/logger");

const app = express();
const PORT = 3000;

connectToMonogoDb("mongodb://127.0.0.1:27017/mongodb-practice-db");

app.use(express.urlencoded({ extended: true }));

app.use(logReqRes);

app.use("/api/users", userRouter);
app.use("/api/articles", articleRouter);
app.use("/api/hash-tags", hashTagRouter);

app.listen(PORT, () => {
  console.log(`Server app running at http://localhost:${PORT}`);
});
