import cookieParser from "cookie-parser";
import express from "express";
import connectToDb from "./models/index.js";
import gamesRouter from "./routes/games.js";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

connectToDb();

// app.get("/", (req, res) => {
//     return res.json({ message: "API OK !!🔥" });
// });

app.use("/games", gamesRouter);

//http://localhost:3333/games/?limit=5&search=Mario&fields=title,japanRelease&orderBy=japanRelease&sortBy=-1&page=3

app.listen(3333, () => {
    console.log("🔥 🔥 API RODANDO 🔥 🔥");
});
