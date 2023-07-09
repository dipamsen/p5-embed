const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/:username/:id", async (req, res) => {
  const { username, id: sketchId } = req.params;
  const url = `https://editor.p5js.org/editor/${username}/projects/${sketchId}`;
  const resp = await fetch(url);
  const data = await resp.json();
  if (!data || !data.files) {
    res.send("Not found");
    return;
  }
  res.redirect(`/${username}/${sketchId}/index.html`);
});

app.get("/:username/:id/:file", async (req, res) => {
  const { username, id: sketchId, file: fn } = req.params;
  const url = `https://editor.p5js.org/editor/${username}/projects/${sketchId}`;
  const resp = await fetch(url);
  const data = await resp.json();
  if (!data || !data.files) {
    res.send("Not found");
    return;
  }
  const files = data.files;

  res
    .type("." + fn.split(".").pop())
    .send(files.find((file) => file.name === fn).content);
  // res.send(`ID: ${req.params.id}`);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
