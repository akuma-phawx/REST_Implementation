const express = require("express");
const app = express();
const path = require("path");
const { emitWarning } = require("process");
const log = console.log;

app.use(express.urlencoded({ extended: true }));

const comments = [
  {
    id: 1,
    username: "Todd",
    comment: "Ewww gross!",
  },
  {
    id: 2,
    username: "Helen",
    comment: "Jesus Christ what an awful movie!",
  },
  {
    id: 3,
    username: "Benfica",
    comment: "Idinajui....",
  },
  {
    id: 4,
    username: "Numas Numas",
    comment: "Vrei sa plezda numa numa numa ei",
  },
  {
    id: 5,
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
  comments.push({ username, comment });
  res.redirect("/comments");
});

//Show an individual thing.
app.get("/comments/:id", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === parseInt(id));
  if (comment) {
    res.render("comments/show", { comment });
  } else {
    res.send("Woops not found");
  }
});
