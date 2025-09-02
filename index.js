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
import subscriptionsRoute from "./routes/subscriptions.js";
import recommendationRoute from "./routes/recommendation.js";
import userSubscriptionRoute from "./routes/userSubscription.js";
import tiffinsRoute from "./routes/tiffin.js";
import messTiffinTypeContentsRouter from "./routes/messTiffinTypeContents.js";

import schedulerRoute from "./routes/scheduler.js";

// import "./schedulers/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("MMT Server Running..."));

// APIS
app.use("/api/recommend", recommendationRoute)
app.use("/api/users/", userRoute)
app.use("/api/users/", userUserRoute)
app.use("/api/locations/", locationRoute)
app.use("/api/tiffins/", tiffinsRoute)
app.use("/api/mess/", messRoute)
app.use("/api/subscriptions", subscriptionsRoute)
app.use("/api/usersubscription", userSubscriptionRoute);
app.use("/api/mess-tiffin-type-content", messTiffinTypeContentsRouter);
app.use("/api/scheduler", schedulerRoute);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Initialize schedulers after database connection
mongoose.connection.once('open', () => {
  console.log('📊 Database connected, initializing schedulers...');
  // Import schedulers after DB is ready
  import('./schedulers/index.js').then(() => {
    console.log('✅ Schedulers initialized successfully');
  }).catch(err => {
    console.error('❌ Failed to initialize schedulers:', err);
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});