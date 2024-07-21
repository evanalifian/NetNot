import express from "express";
import apiController from "../controllers/notes-controllers.js";

const apiRouter = express.Router();

apiRouter.post("/add", apiController.create);
apiRouter.post("/edit", apiController.edit);
apiRouter.get("/remove/:note_title", apiController.remove);

export default apiRouter;
