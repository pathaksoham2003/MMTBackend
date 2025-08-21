import express from "express";
import mongoose from "./utils/db.js";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUI from "swagger-ui-express";
import swaggerSpec from "./swagger/swagger.js";

import userRoute from "./routes/user.js";
import userUserRoute from "./routes/messUser.js";
import locationRoute from "./routes/location.js";
import messRoute from "./routes/mess.js";
import timeSlotRoute from "./routes/timeSlots.js";
import tiffinTypeRoute from "./routes/tiffinType.js";
import subscriptionTypeRoute from "./routes/subscriptionType.js";
import subscriptionsRoute from "./routes/subscriptions.js";
import "./schedulers/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("MMT Server Running..."));

// APIS
app.use("/api/users/",userRoute)
app.use("/api/users/",userUserRoute)
app.use("/api/locations/",locationRoute)
app.use("/api/mess/",messRoute)
app.use("/api/time-slots/",timeSlotRoute)
app.use("/api/tiffin-types",tiffinTypeRoute)
app.use("/api/subscription-types",subscriptionTypeRoute)
app.use("/api/subscriptions",subscriptionsRoute)
// schedulers


app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
