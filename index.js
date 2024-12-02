const express = require("express");
const userRouter = require("./routes/user");
const { connectToMonogoDb } = require("./connection");
const { logReqRes } = require("./middlewares/logger")

const app = express();
const PORT = 3000;

connectToMonogoDb('mongodb://127.0.0.1:27017/mongodb-practice-db');

app.use(express.urlencoded({ extended: true }));

app.use(logReqRes)

app.use('/api/users', userRouter);

app.listen(PORT, () => {
    console.log(`Server app running at http://localhost:${PORT}`);
})