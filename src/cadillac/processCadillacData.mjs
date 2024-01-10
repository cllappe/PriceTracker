import * as fs from 'node:fs';

import { insertCadillac } from '../sql.mjs';

async function processCadillac(){
    fs.readFile('resultsCadillac.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        var obj = JSON.parse(data);
        var vehicles = [];
        for (var i = 0; i < obj.data.count; i++) {
            var vehicle = obj.data.hits[i];
            var vehicleSql = [];
            vehicleSql.push(vehicle.id);
            vehicleSql.push(vehicle.model);
            vehicleSql.push(parseInt(vehicle.year));
            vehicleSql.push(vehicle.dealer.name);
            vehicleSql.push(parseInt(vehicle.pricing.cash.baseDealerFeaturedPrice.value));
            vehicleSql.push(parseInt(vehicle.pricing.cash.netPrice.value));
            vehicleSql.push(parseInt(vehicle.pricing.cash.msrp.value));
            vehicleSql.push(parseInt(vehicle.pricing.cash.netPrice.value));
            var discounts = 0;
            var discountsObj = vehicle.pricing.cash.discounts;
            Object.keys(discountsObj).forEach(function(key) {
                discounts += parseInt(discountsObj[key].value);
            });
            vehicleSql.push(discounts);
            vehicleSql.push(vehicle.driveType);
            vehicleSql.push(vehicle.variant.name);
            vehicleSql.push(vehicle.baseExteriorColor);
            vehicles.push(vehicleSql);
        }
        insertCadillac(vehicles);
    });
}

export { processCadillac };