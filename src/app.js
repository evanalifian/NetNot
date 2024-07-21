import express from "express";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import ejs from "ejs";
import pageRouter from "./routes/page-routes.js";
import apiRouter from "./routes/api-routes.js";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);
export const app = express();

app.use(express.urlencoded({ extended: false }));

// Set EJS as the template engine
app.engine(".html", ejs.__express);
app.set("views", path.join(__dirname, "views"));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "html");

app.get("/", (req, res) => {
  res.status(301).redirect("/notes")
})

app.use("/notes", pageRouter);
app.use("/notes", apiRouter);

// not found middleware
app.use((req, res) => {
  res.json({
    status: 404,
    message: "Page not found",
  });
});
