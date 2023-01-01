import dotenv from 'dotenv'
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { WebSocketServer } from 'ws';
import mongoose from "mongoose";
import fileUpload from 'express-fileupload';
import { cloudConfig } from './APIs/cloudinary.js';
import reportRoutes from './routes/report.routes.js'
import zoneRoutes from './routes/zones.router.js'
import userRoutes from './routes/users.js'

const app = express();
dotenv.config()
cloudConfig()
const wss = new WebSocketServer({ port: 8085 });

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : './uploads'
}));

app.use('/report', reportRoutes)
app.use('/zones', zoneRoutes)
app.use('/user', userRoutes)


wss.on('connection', function connection(ws) {
  app.locals.ws = ws
  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });
});
const PORT =  process.env.PORT || 5000;
mongoose.connect(process.env.CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch((er) => console.log("error",er.message));


