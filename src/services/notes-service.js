import { __dirname } from "../app.js";
import {
  loadJSONFile,
  rewriteMarkdownFile,
  writeJSONFile,
  writeMarkdownFile,
} from "../utils/utils.js";
import fs from "fs";

const create = (formData) => {
  const result = loadJSONFile();
  result.push(formData);
  writeJSONFile(result);
  writeMarkdownFile(formData);
};

const edit = (formData) => {
  const result = loadJSONFile();
  const filteredNote = result.filter((n) => {
    return n.note_title != formData.old_title;
  });
  rewriteMarkdownFile(formData);
  delete formData.old_title;
  filteredNote.push(formData);
  writeJSONFile(filteredNote);
};

const remove = (noteTitle) => {
  const result = loadJSONFile();
  const filteredNote = result.filter((n) => {
    return n.note_title != noteTitle;
  });
  writeJSONFile(filteredNote);
  fs.unlinkSync(`${__dirname}/notes/${noteTitle}.md`);
};

export default {
  create,
  edit,
  remove,
};
