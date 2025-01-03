const dbProcess = require("./dbProcess");
const fileProcess = require("./fileProcess");
const ftpProcess = require("./ftpProcess");
const dotenv = require("dotenv");

dotenv.config();

const server_url = process.env.SERVER_URL;
const database_name = process.env.DATABASE_NAME;
const database_username = process.env.DATABASE_USERNAME;
const database_password = process.env.DATABASE_PASSWORD;

const ftp_server = process.env.FTP_SERVER;
const ftp_port = process.env.FTP_PORT;
const ftp_username = process.env.FTP_USERNAME;
const ftp_folder = process.env.FTP_FOLDER;
const ftp_password = process.env.FTP_PASSWORD;

const getStockObjects = async () => {
    let connectionPool;
    try {
        // Establish the database connection
        connectionPool = await dbProcess.connection(
            server_url,
            database_name,
            database_username,
            database_password
        );

        // Fetch the stock objects
        const stockObjects = await dbProcess.queryAndCreateObjects(connectionPool);

        // Return the list of stock objects
        return stockObjects;

    } catch (error) {
        console.error("Error during database operation:", error);
        throw error;
    } finally {
        if (connectionPool) {
            // Close the connection
            await dbProcess.closeConnection(connectionPool);
        }
    }
}

const ftpConfig = {
    host: ftp_server,
    port: ftp_port,
    user: ftp_username,
    password: ftp_password,
    secure: false,
    remoteFolder: ftp_folder
}

getStockObjects()
    .then(stockObjects => fileProcess.createCSVFileFromListOfStockObjects(stockObjects))
    .then(csvFile => {
        const fileName = fileProcess.setFileName()
        fileProcess.saveCSVFileToTemp(csvFile, fileName)
        ftpProcess.uploadFileToFtp(ftpConfig)
    })
    .catch(error => {
        console.error("Failed to fetch stock objects:", error);
    });
