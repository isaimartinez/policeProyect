import dotenv from 'dotenv'
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { WebSocketServer } from 'ws';
import c4Routes from './routes/c4.js'

const app = express();
dotenv.config()
const wss = new WebSocketServer({ port: 8085 });

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());
app.use('/c4', c4Routes)


wss.on('connection', function connection(ws) {
  app.locals.ws = ws
  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

  // ws.send('Que rollo');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => 
  console.log(`Server running on port: ${PORT}`))

