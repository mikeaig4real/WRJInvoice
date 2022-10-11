// Requirements

require('dotenv').config();

const dbInstance = require('./dbInstance');

const port = process.env.PORT || 8000;

const start = async (DB_TYPE) => {

  try {

    // db

    const dbEngine = await require('./db/dbEngines')(DB_TYPE);

    await dbEngine.connectDB().then((DB) => console.log(`CONNECTED TO DATABASE: ${DB} - ${DB_TYPE.toUpperCase()}`));

    dbInstance.setDB(dbEngine);

    const app = require('./app');

    app.listen(port, () => {

      console.log(`SERVER IS lISTENING ON PORT: ${port}...`);

    });

  } catch (error) {

    throw new Error(error);

  }
}

start('mongodb');
