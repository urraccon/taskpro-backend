import mongoose from 'mongoose';
import { config } from 'dotenv';
import app from './app.js';

config();

const { MONGO_DB, PORT, NODE_ENV, URL } = process.env || 5000;

const infoLog = function (env, port, url) {
  const mode = env ? '💻 Dev mode ON.' : '📡 Production mode ON.';
  const db = '🔗 MongoDB connection established successfully!';
  const home = env ? `🏠 http://localhost:${port}` : `🌍 ${url}`;
  const server = `🟢 Server's up listening on port ${port}`;
  const doc = env ? `📄 http://localhost:${port}/api-docs` : `📄 ${url}/api-docs`;

  return `\n${mode}\n${db}\n${home}\n${server}\n${doc}`;
};

const main = async () => {
  try {
    if (!MONGO_DB) throw new Error("🔴 Couldn't connect to MongoDB!");

    await mongoose.connect(MONGO_DB);

    app.listen(PORT, err => {
      if (err) throw err;

      console.log(infoLog(NODE_ENV === 'development', PORT, URL));
    });
  } catch (error) {
    console.error(`❗ ${error.message}`);

    process.exit(1);
  }
};

main();
