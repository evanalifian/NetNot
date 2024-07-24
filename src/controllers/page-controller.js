import { marked } from "marked";
import { loadJSONFile, loadMarkdownFiles } from "../utils/utils.js";
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
  const filteredNotes = loadMarkdownFiles(md).filter(n => n.is_important)
  const searchNote = loadMarkdownFiles(md).filter(n => n.title.toLowerCase().includes(req.query.search_note))

  if (req.query.filter === "important") {
    res.render("index", { contents: filteredNotes });
  } else if (req.query.filter === "all") {
    res.render("index", { contents: loadMarkdownFiles(md) });
  } else if (req.query.search_note) {
    res.render("index", { contents: searchNote });
  } else {
    res.render("index", { contents: loadMarkdownFiles(md) });
  }
};

const serveContentPage = (req, res) => {
  const { title } = req.params;
  const filteredNotes = loadMarkdownFiles(md).filter(n => n.title === title)
  res.render("content", { content: filteredNotes[0] });
};

const serveAddPage = (req, res) => {
  res.render("create");
};

const serveEditPage = (req, res) => {
  const { title } = req.params;
  const filteredNotes = loadMarkdownFiles(md).filter(n => n.title === title)
  const result = loadJSONFile().filter((n) => n.title === title);

  res.render("edit", { content: filteredNotes[0], formContent: result[0].content });
};

export default {
  serveHomePage,
  serveContentPage,
  serveAddPage,
  serveEditPage,
};
