import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT;

let server;

const startServer = async () => {
  try {
    await connectDB();

    server = app.listen(PORT, () => {
      console.log(
        `Server running on port ${PORT}`
      );
    });
  } catch (error) {
    console.error(
      "Server startup failed:",
      error.message
    );

    process.exit(1);
  }
};

startServer();

//Graceful Shutdown
process.on("SIGINT", () => {
  console.log(
    "\nServer shutting down..."
  );

  if (server) {
    server.close(() => {
      console.log(
        "Server closed gracefully"
      );
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
});