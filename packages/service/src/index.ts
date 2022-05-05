import app from "./app";

const port = 3100;

app.listen(port, () => {
  console.debug("[Debug] Server Listen on Port", port);
});
