import { Router } from "express";
import userRoutes from "./routes/userRoutes";

const router: Router = Router();

router.get("/", (req, res) => res.send("Hello, world!"));
router.use("/user", userRoutes);

export { router };
