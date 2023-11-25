import express from "express";
import { Serviceseekers } from "../controller";
import auth from "../middlewares/auth";
let router = express.Router();

router.post("/create", auth, Serviceseekers.createAccount);
router.get("/getall", Serviceseekers.getAllServiceSeeker);
router.get("/getsingle/:id", Serviceseekers.getSingleServiceSeeker);
export default router;
