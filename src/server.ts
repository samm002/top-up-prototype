import express from "express";
import cors from "cors";
import axios from "axios";

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

app.get("/", async (req: express.Request, res: express.Response) => {
  try {
    const response = await axios.get('https://api.ipify.org?format=json');
    res.send(`Welcome to Top Up Prototype!, server ip : ${response.data.ip}`);
  } catch (error) {
    res.status(500).send('Error retrieving IP address');
  }
});



app.listen(PORT, () => {
  console.log(`Server is running at ${HOSTNAME || "http://localhost"}:${PORT}`);
});