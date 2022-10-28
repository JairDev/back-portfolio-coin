const express = require("express");
const port = 5000;
const app = require("./app.ts");

app.listen(port, () => {
  console.log(`Server on port ${port}`);
});
