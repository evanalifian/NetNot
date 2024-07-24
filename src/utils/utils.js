import { __dirname, notesDir } from "../app.js";
import fs from "fs";

export const loadJSONFile = (md) => {
  return JSON.parse(fs.readFileSync(`${__dirname}/notes/notes.json`, "utf-8"));
};

export const writeJSONFile = (data) => {
  fs.writeFileSync(`${__dirname}/notes/notes.json`, JSON.stringify(data));
};

export const loadMarkdownFiles = (md) => {
  return fs.readdirSync(notesDir).map((note) => {
    const content = fs.readFileSync(`${notesDir}/${note}`, "utf-8");
    const fileName = note.split(".md").join("");
    const title = fileName.includes("important-")
      ? fileName.split("important-").join("")
      : fileName;
    const is_important = fileName.includes("important-") ? true : false;
    return { path: `${notesDir}${note}`, content: md.render(content), title, is_important };
  });
};

export const writeMarkdownFile = (data) => {
  fs.writeFileSync(
    `${notesDir}${data.is_important ? "important-" : ""}${
      data.title
    }.md`,
    data.content
  );
};

export const rewriteMarkdownFile = (data) => {
  fs.unlinkSync(data.old_path);
  writeMarkdownFile(data);
};
