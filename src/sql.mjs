import mysql from 'mysql';
import 'dotenv/config';

function createConnection() {
    return mysql.createConnection(process.env.DATABASE_URL);
}

function closeConnection(connection) {
    connection.end();
}

function insertToyota(values){
    const connection = createConnection();
    var sql = "INSERT INTO resultsToyota (vin, make, year, dealer, dealerWebsite, advertizedPrice, nonSpAdvertizedPrice, totalMsrp, sellingPrice, dph, dioTotalMsrp, dioTotalDealerSellingPrice, dealerCashApplied, baseMsrp, options, model, intColor_marketingName, intColor_nvsName, intColor_colorFamilies, extColor_marketingName, extColor_nvsName, extColor_colorFamilies) VALUES ? ON DUPLICATE KEY UPDATE vin=vin";
    connection.query(sql, [values], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
        closeConnection(connection);
    });
}

function insertCadillac (values) {
    const connection = createConnection();
    var sql = "INSERT INTO resultsCadillac (vin, make, year, dealer, dealerFeaturedPrice, netPrice, msrp, sellingPrice, discounts, driveType, model, color) VALUES ? ON DUPLICATE KEY UPDATE vin=vin";
    connection.query(sql, [values], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
        closeConnection(connection);
    });
}

export { insertToyota, insertCadillac };
