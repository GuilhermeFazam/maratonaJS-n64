import mongoose from "mongoose";
const { Schema, model } = mongoose;

const GameSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        otherTitles: [String],
        developers: [String],
        publishers: [String],
        genres: [String],
        firstReleased: Date,
        japanRelease: Date,
        usaRelease: Date,
        euroRelease: Date,
    },
    { collection: "games", strict: false }
);

const Game = model("Game", GameSchema);

export function find(criteria) {
    const { search, limit, page, fields, orderBy, sortBy } = criteria;
    const query = Game.find();
    const skip = page > 1 ? (page - 1) * limit : 0;

    if (search) {
        const regex = new RegExp(`.*${search}.*`, "i");
        const searchQuery = {
            $or: [
                { title: regex },
                { otherTitles: regex },
                { publishers: regex },
                { developers: regex },
            ],
        };
        query.find(searchQuery);
    }

    if (limit) {
        query.limit(limit);
    }
    if (skip) {
        query.skip(skip);
    }

    if (fields) {
        const newFields = fields.replace(/\s/g, "").split(",");

        query.select(newFields);
    }

    if (orderBy) {
        query.sort({ [orderBy]: sortBy });
    }

    return query.exec();
}
