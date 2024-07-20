const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRoutes = require("./Routes/authRoutes.js");
const userRoutes = require("./Routes/userRoutes.js");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected  to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB: ", error.message);
  });

const corsOptions = {
  origin: true,
};

const { spawn } = require('child_process');
const path = require('path');

async function callMLModel(inputData) {
    return new Promise((resolve, reject) => {
        const pythonProcess = spawn('python', [path.join(__dirname, 'Lung_Cancer_Risks.py'), ...inputData]);

        pythonProcess.stdout.on('data', (data) => {
            resolve(data.toString());
        });

        pythonProcess.stderr.on('data', (data) => {
            reject(data.toString());
        });
    });
}


app.use(cors(corsOptions));
// app.use(express.json())
app.use(bodyParser.json());
app.use(cookieParser());
app.use(authRoutes);
app.use(userRoutes);

app.get("/", (req, res) => {
  res.send("home");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
module.exports = app;
