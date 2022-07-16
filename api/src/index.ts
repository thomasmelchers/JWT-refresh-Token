import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import routes from "./routes";
import deserializeUser from "./middleware/deserializeUser";
import { connect } from './utils/connection';

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// be called on every request
app.use(deserializeUser);

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

const main = async() => {
  app.listen(4000, () => {
    console.log(`Server listening at http://localhost:4000`);
  });

  await connect();
  routes(app);
}

main();
