import { PORT } from "./config/index.js";
import {
  auth,
  serviceSeeker,
  serviceRequest,
  comments,
  notification,
  payment,
  admin,
} from "./routes/index.js";
import errorHandler from "./middlewares/errorhander.js";
import express from "express";
import connectDB from "./config/database/ConnectDB.js";
import http from "http";
import path from "path";
import cors from "cors";
import { Server } from "socket.io";

let app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://127.0.0.1:5173", // Update with your React app's origin
    methods: ["GET", "POST"],
  },
});

app.use("/storage", express.static("storage"));
app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: "8mb" }));

// connectDB
connectDB(`${process.env.MONGO_URL}`);

global.appRoot = path.resolve(__dirname);



// config routes
app.use("/api", auth);
app.use("/api/v1", payment);
app.use("/api/serviceSeeker", serviceSeeker);
app.use("/api/servicerequest", serviceRequest);
app.use("/api/comments", comments);
app.use("/api/notification", notification);
app.use("/api/admin", admin);

app.use(express.static(path.join(__dirname, "./client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/dist/index.html"));
});



// config errorHandler
app.use(errorHandler);

io.on("connection", (socket) => {
  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
  });

  socket.on("sendNoti", (data) => {
    io.to(data.receiverId).emit("recNoti", data);
  });

  socket.on("disconnect", () => {
    // console.log('User disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server running at port http://localhost:${PORT}`);
});
