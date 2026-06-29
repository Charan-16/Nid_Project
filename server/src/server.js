import app from "./app.js";

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`NID Campus Portal API running on http://localhost:${port}`);
});
