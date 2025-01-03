const StockObject = require("./StockObject")
const fs = require('fs');
const path = require('path');

const createCSVFileFromListOfStockObjects = (objects) => {
    if (!objects || objects.length === 0) {
        throw new Error('No stock objects provided');
    }

    const headers = Object.keys(objects[0]);
    const csvRows = objects.map(obj => 
        headers.map(header => obj[header]).join(';')
    );

    return [headers.join(';'), ...csvRows].join('\n');
}

const setFileName = () => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    return `stock_objects_${timestamp}.csv`;
}

const saveCSVFileToTemp = (csvString, fileName) => {
    const tempDir = path.join(__dirname, 'tmp');
    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir);
    }

    const filePath = path.join(tempDir, fileName);
    fs.writeFileSync(filePath, csvString, 'utf8');
    return filePath;
}

module.exports = {
    createCSVFileFromListOfStockObjects,
    setFileName,
    saveCSVFileToTemp
}