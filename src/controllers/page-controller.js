import { marked } from "marked";
import { loadJSONFile } from "../utils/utils.js";
import MarkdownIt from "markdown-it";
import markdownItFootnote from "markdown-it-footnote";
import markdownItAnchor from "markdown-it-anchor";
import markdownItDeflist from "markdown-it-deflist";
import markdownItMark from "markdown-it-mark";
import markdownItSub from "markdown-it-sub";
import markdownItSup from "markdown-it-sup";
import markdownItTaskLists from "markdown-it-task-lists";

const md = new MarkdownIt()
  .use(markdownItFootnote)
  .use(markdownItAnchor)
  .use(markdownItDeflist)
  .use(markdownItMark)
  .use(markdownItSub)
  .use(markdownItSup)
  .use(markdownItTaskLists);

const serveHomePage = (req, res) => {
  const result = loadJSONFile();
  const filteredNotes = result.filter((n) => n.is_important === "checked");
  const searchNote = result.filter((n) => n.note_title.toLowerCase().includes(req.query.search_note));
  if (req.query.filter === "important") {
    res.render("index", { notes: filteredNotes, md, marked });
  } else if (req.query.filter === "all") {
    res.render("index", { notes: result, md, marked });
  } else if (req.query.search_note) {
    res.render("index", { notes: searchNote, md, marked });
  } else {
    res.render("index", { notes: result, md, marked });
  }
};

const serveContentPage = (req, res) => {
  const { note_title } = req.params;
  const result = loadJSONFile().filter((n) => n.note_title === note_title);
  res.render("content", { note: result[0], md, marked });
};

const serveAddPage = (req, res) => {
  res.render("create");
};

const serveEditPage = (req, res) => {
  const { note_title } = req.params;
  const result = loadJSONFile().filter((n) => n.note_title === note_title);

  res.render("edit", { note: result[0] });
};

export default {
  serveHomePage,
  serveContentPage,
  serveAddPage,
  serveEditPage,
};
