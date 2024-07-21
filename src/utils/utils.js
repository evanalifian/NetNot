import { __dirname } from "../app.js";
import fs from "fs";

export const loadJSONFile = () => {
  return JSON.parse(fs.readFileSync(`${__dirname}/notes/notes.json`, "utf-8"));
};

export const writeJSONFile = (formData) => {
  fs.writeFileSync(`${__dirname}/notes/notes.json`, JSON.stringify(formData));
};

export const writeMarkdownFile = (formData) => {
  fs.writeFileSync(
    `${__dirname}/notes/${formData.note_title}.md`,
    formData.note_content
  );
};

export const rewriteMarkdownFile = (formData) => {
  fs.unlinkSync(`${__dirname}/notes/${formData.old_title}.md`);
  writeMarkdownFile(formData);
};
