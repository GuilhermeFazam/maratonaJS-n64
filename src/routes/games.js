import { Router } from "express";
import { find } from "../models/Games.js";

const gamesRouter = Router();

gamesRouter.get("/", async (req, res) => {
    const { limit, page, fields, orderBy, sortBy, search } = req.query;
    const DEFALT_LIMIT = 10;
    const DEFALT_PAGE = 1;
    const criteria = {
        limit: Number(limit) || DEFALT_LIMIT,
        page: Number(page) || DEFALT_PAGE,
        fields: fields || null,
        orderBy: orderBy || "title",
        sortBy: sortBy !== undefined ? Number(sortBy) : 1,
        search: search || null,
    };
    const result = await find(criteria);
    return res.json({ message: "Game OK", data: result });
});

export default gamesRouter;
