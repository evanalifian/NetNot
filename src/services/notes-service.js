import { __dirname, notesDir } from "../app.js";
import {
  loadJSONFile,
  rewriteMarkdownFile,
  writeJSONFile,
  writeMarkdownFile,
} from "../utils/utils.js";
import fs from "fs";

const create = (formData) => {
  const result = loadJSONFile();
  const data = {
    path: `${notesDir}${formData.is_important ? "important-" : ""}${formData.title}.md`,
    title: formData.title,
    content: formData.content,
    is_important: formData.is_important ? formData.is_important : null,
  }
  result.push(data);
  writeJSONFile(result);
  writeMarkdownFile(data);
};

const edit = (formData) => {
  const result = loadJSONFile();
  const filteredNote = result.filter((n) => {
    return n.title != formData.old_title;
  });
  const data = {
    old_path: `${notesDir}${formData.old_is_important ? "important-" : ""}${formData.old_title}.md`,
    path: `${notesDir}${formData.is_important ? "important-" : ""}${formData.title}.md`,
    title: formData.title,
    content: formData.content,
    is_important: formData.is_important ? formData.is_important : null,
  }
  rewriteMarkdownFile(data);
  delete data.old_path;
  delete data.old_title;
  delete data.old_is_important;
  filteredNote.push(data);
  writeJSONFile(filteredNote);
};

const remove = (title) => {
  const result = loadJSONFile();
  const filteredNote = result.filter((n) => {
    return n.title != title
  });
  fs.unlinkSync(`${notesDir}${title}.md`);
  writeJSONFile(filteredNote);
};

export default {
  create,
  edit,
  remove,
};
