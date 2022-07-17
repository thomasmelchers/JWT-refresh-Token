import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import routes from "./routes";
import deserializeUser from "./middleware/deserializeUser";
import { connect } from './utils/connection';
import config from 'config';
import dotenv from 'dotenv';
import path from 'path';

const app = express();

dotenv.config();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// be called on every request
app.use(deserializeUser);

// app.get('/', (req, res) => { res.send('hello world!');})
app.use(
  cors({
    credentials: true,
    origin: "thomas-melchers-refreshtoken.netlify.app",
  })
);

// const node_env = config.get<string>("NODE_ENV");
// if(node_env === "production"){
//   app.use(express.static(path.join(__dirname, '../ui/build')))

//   app.get('*', (req: Request, res: Response) => {
//     res.sendFile(path.join(__dirname, '../ui', 'build', 'index.html'));
//   })  
// } else {
//   app.get('/', (req: Request, res: Response) => { 
//     res.send('Api is running');
//   })
// }

const main = async() => {
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });

  await connect();
  routes(app);
  //console.log(node_env)
  console.log('accessToken:', config.get<string>('expireAccessToken'))
  console.log('verifyToken:', config.get<string>('expireVerifyToken'))
  console.log('publicKey:', config.get<string>('publicKey'))
  console.log('privateKey:', config.get<string>('privateKey'))
  console.log('salt:', config.get<number>('saltWorkFactor'))
}

main();
