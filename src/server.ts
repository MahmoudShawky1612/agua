import app from "./app";

const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
