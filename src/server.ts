import express from "express";
import cors from "cors";

import { PORT } from "@/utils/env";
import routes from "@/routes";
import db from "@/utils/database";

db();

const app = express();
const HOSTNAME = process.env.HOSTNAME || "http://localhost";

app.use(cors({origin: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", routes)

app.get("/", (req: express.Request, res: express.Response) => {
  res.send('Welcome to Top Up Prototype!');
});

app.listen(PORT, () => {
  console.log(`Server is running at ${HOSTNAME || "http://localhost"}:${PORT}`);
});