require("dotenv").config();
import mongoose from "mongoose";
import app from "./app";
// @ts-ignore
import { logInfo, logError } from "./utils/logger";

const port = process.env.PORT || 3001;
app.listen(port, async () => {
  logInfo(`Server listening on port ${port}`);
  mongoose
    .connect(process.env.mongoURI as string)
    .then(() => logInfo("MongoDB Connected"))
    .catch((err) => logError("MongoDB connection error:" + err));
});
