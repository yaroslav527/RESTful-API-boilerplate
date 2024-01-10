import http from "http";
import express from "express";
import logger from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// mongo connection
import "../config/mongo";

// routes
import indexRouter from "../routes/index";

dotenv.config();

const app = express();
const corsObj = {
  origin: ["*"],
  methods: ['GET', 'POST', "DELETE", "PUT", "PATCH"],
  credentials: true
}
app.use(cors(corsObj));
app.use(cookieParser());

/** Get port from environment and store in Express. */
const port = process.env.PORT || "2087";
app.set("port", port);
app.use(logger("dev"));

// BODYPARSER
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use("/", indexRouter);

/** catch 404 and forward to error handler */
app.use('*', (req, res) => {
  return res.status(404).json({
    success: false,
    message: 'API endpoint doesnt exist'
  })
});

let server = null;
/** Create HTTP server. */
server = http.createServer(app);

/** Listen on provided port, on all network interfaces. */
server.listen(port);
/** Event listener for HTTP server "listening" event. */
server.on("listening", () => {
  console.log(`Listening on port:: ${port}`)
});