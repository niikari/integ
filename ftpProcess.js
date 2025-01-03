const ftp = require('basic-ftp');
const path = require('path');
const fs = require('fs');

const uploadFileToFtp = async (config, csvFile, fileName) => {
    const client = new ftp.Client();
    client.ftp.verbose = true;

    // console.log(config)

    try {
        // Connect to FTP-server
        console.log('Connecting to FTP server...');
        await client.access({
            host: config.host,
            user: config.user,
            password: config.password,
            secure: config.secure || false,
            passv: true            
        });

        console.log('Connected to FTP server.');

        // Navigate to proper folder in FTP-server
        if (config.remoteFolder) {
            console.log(`Navigating to folder: ${config.remoteFolder}`);
            await client.cd(config.remoteFolder);
            console.log(`Successfully navigated to folder: ${config.remoteFolder}`);
        } else {
            console.warn('No remoteFolder specified in config. Staying in root directory.');
        }

        // Upload the CSV file
        const filePath = path.resolve(csvFile);
        console.log(`Uploading file: ${filePath} as ${fileName}`);
        await client.uploadFrom(filePath, fileName);
        console.log(`File uploaded successfully as ${fileName}`);

    } catch (error) {
        console.error('FTP Upload Error:', error.message);
    } finally {
        client.close();
        console.log('FTP connection closed.');
    }
}

module.exports = {
    uploadFileToFtp
}
