import { config } from "dotenv";
import { readFile } from "fs";
import { connect, model, Schema } from "mongoose";

config();

const GameSchema = new Schema({ title: String }, { strict: false });

const Game = model("Game", GameSchema);

const parseJSON = (data) => {
    try {
        return JSON.parse(data);
    } catch (err) {
        return null;
    }
};

const connectToDb = () => {
    const options = {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
    };
    return connect(process.env.DATABASE, options);
};

const readGamesFromFile = (filename) => {
    const promiseCallback = (resolve, reject) => {
        readFile(filename, (err, data) => {
            if (err) {
                return reject(err);
            }
            const json = parseJSON(data);
            if (!json) {
                return reject(`Not able to parse JSON file ${filename}`);
            }
            return resolve(json);
        });
    };

    return new Promise(promiseCallback);
};

const storeGame = (data) => {
    const game = new Game(data);
    return game.save();
};

const importGame = async () => {
    await connectToDb();
    const games = await readGamesFromFile("games.json");

    for (let i = 0; i < games.length; i++) {
        const game = games[i];
        await storeGame(game);
        console.log(game.title);
    }

    process.exit();
};

importGame();
