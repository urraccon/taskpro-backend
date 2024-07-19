const mongoose = require("mongoose");
const app = require("./app");
const { HOST_DB, PORT } = process.env;
const main = async () => {
  try {
    if (!HOST_DB) throw new Error("Host is not defined!");
    await mongoose.connect(HOST_DB);
    console.log("MongoDB connection established successfully!");
    app.listen(PORT, (err) => {
      if (err) throw err;
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
};
main();
