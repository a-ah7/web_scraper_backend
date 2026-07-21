require("dotenv").config();

const pool = require("./database");

async function testDatabaseConnection() {
    try {
        const connection = await pool.getConnection();

        console.log("MySQL database connected successfully");

        connection.release();
        process.exit(0);
    } catch (error) {
        console.error("Database connection failed:");
        console.error(error.message);

        process.exit(1);
    }
}

testDatabaseConnection();