const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const { v4: uuid } = require("uuid");
const { emitWarning } = require("process");
const { mkdirSync } = require("fs");
const log = console.log;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

let comments = [
  {
    id: uuid(),
    username: "Todd",
    comment: "Ewww gross!",
  },
  {
    id: uuid(),
    username: "Helen",
    comment: "Jesus Christ what an awful movie!",
  },
  {
    id: uuid(),
    username: "Benfica",
    comment: "Idinajui....",
  },
  {
    id: uuid(),
    username: "Numas Numas",
    comment: "Vrei sa plezda numa numa numa ei",
  },
  {
    id: uuid(),
    username: "Karoten",
    comment: "Get me shady lady blady ;)",
  },
];

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.listen(8080, () => {
  log("*Server Started* - Listening on Port 8080.");
});

//Show all comments.
app.get("/comments", (req, res) => {
  res.render("comments/index", { comments });
});

//Render the form for the new comment
app.get("/comments/new", (req, res) => {
  res.render("comments/new");
});

//Create the comment
app.post("/comments", (req, res) => {
  const { username, comment } = req.body;
  comments.push({ username, comment, id: uuid() });
  res.redirect("/comments");
});

//Show an individual thing.
app.get("/comments/:id", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  if (comment) {
    res.render("comments/show", { comment });
  } else {
    res.send("Woops not found");
  }
});

//Get request to get the form
app.get("/comments/:id/edit", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render("comments/edit", { comment });
});

//Update comment
app.patch("/comments/:id", (req, res) => {
  const { id } = req.params;
  const newCommentText = req.body.comment;
  const foundComment = comments.find((c) => c.id === id);
  foundComment.comment = newCommentText;
  res.redirect("/comments");
});

app.delete("/comments/:id", (req, res) => {
  const { id } = req.params;
  comments = comments.filter((c) => c.id !== id);
  res.redirect("/comments");
});
