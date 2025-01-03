const mssql = require("mssql");
const StockObject = require("./StockObject")

const connection = async (server_url, database_name, database_username, database_password) => {
    try {
        const config = {
            server: server_url,
            database: database_name,
            user: database_username,
            password: database_password,
            options: {
                encrypt: false,
                trustServerCertificate: true
            }
        };

        const pool = await mssql.connect(config);
        console.log("Connected to the database successfully!");
        return pool;
    } catch (error) {
        console.error("Database connection failed:", error);
        throw error;
    }
}

const closeConnection = async (pool) => {
    try {
        await pool.close();
        console.log("Database connection closed successfully!");
    } catch (error) {
        console.error("Error closing the database connection:", error);
        throw error;
    }
}

const queryAndCreateObjects = async (pool) => {
    try {
        // Change this query for production
        const result = await pool.request().query("SELECT * FROM InventoriesFromOrumnetToServiceNextTest;");
        const stockObjects = result.recordset.map(row => new StockObject(
            row.ITEM_ID,
            row.BRAND,
            row.TECDOC_ARNR_CODE,
            row.TECDOC_BRAND_CODE,
            row.WAREHOUSE_CODE,
            row.WAREHOUSE_LOCATION,
            row.STOCK,
            row.PROVIDER_REFERENCE
        ));

        return stockObjects;
    } catch (error) {
        console.error("Error executing query:", error);
        throw error;
    }
}

module.exports = {
    connection,
    closeConnection,
    queryAndCreateObjects
}