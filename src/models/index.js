import { config } from "dotenv";
import mongoose from "mongoose";
const { connect } = mongoose;
config();

const MONGODB_URL = process.env.DATABASE;

const connectToDb = () => {
    const options = {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
    };
    return connect(MONGODB_URL, options);
};

export default connectToDb;
