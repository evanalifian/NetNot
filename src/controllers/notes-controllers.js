import { __dirname } from "../app.js";
import notesServices from "../services/notes-service.js";

const create = (req, res) => {
  notesServices.create(req.body);
  res.redirect("/notes");
};

const edit = (req, res) => {
  notesServices.edit(req.body);
  res.redirect("/notes");
};

const remove = (req, res) => {
  const { note_title } = req.params
  notesServices.remove(note_title);
  res.redirect("/notes");
};

export default {
  create,
  edit,
  remove,
};
