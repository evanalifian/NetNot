import express from "express";
import pageController from "../controllers/page-controller.js";

const pageRouter = express.Router();

// served page
pageRouter.get("/", pageController.serveHomePage);
pageRouter.get("/open/:title", pageController.serveContentPage);
pageRouter.get("/add", pageController.serveAddPage);
pageRouter.get("/edit/:title", pageController.serveEditPage);

export default pageRouter;
