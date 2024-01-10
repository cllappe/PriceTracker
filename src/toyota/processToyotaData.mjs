import * as fs from 'node:fs';

import { insertToyota } from '../sql.mjs';

async function processToyota(){
    fs.readFile('resultsToyota.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        var obj = JSON.parse(data);
        var vehicles = [];
        for (var i = 0; i < obj.locateVehiclesByZip.vehicleSummary.length; i++) {
            var vehicle = obj.locateVehiclesByZip.vehicleSummary[i];
            var vehicleSql = [];
            vehicleSql.push(vehicle.vin);
            vehicleSql.push(vehicle.marketingSeries);
            vehicleSql.push(vehicle.year);
            vehicleSql.push(vehicle.dealerMarketingName);
            vehicleSql.push(vehicle.dealerWebsite);
            vehicleSql.push(vehicle.price.advertizedPrice);
            vehicleSql.push(vehicle.price.nonSpAdvertizedPrice);
            vehicleSql.push(vehicle.price.totalMsrp);
            vehicleSql.push(vehicle.price.sellingPrice);
            vehicleSql.push(vehicle.price.dph);
            vehicleSql.push(vehicle.price.dioTotalMsrp);
            vehicleSql.push(vehicle.price.dioTotalDealerSellingPrice);
            vehicleSql.push(vehicle.price.dealerCashApplied);
            vehicleSql.push(vehicle.price.baseMsrp); 
            var options = [];
            for (var j = 0; j < vehicle.options.length; j++) {
                var option = vehicle.options[j];
                options.push(option.marketingName)            
            }
            vehicleSql.push(options.join(', '));
            vehicleSql.push(vehicle.model.marketingName);
            vehicleSql.push(vehicle.intColor.marketingName);
            vehicleSql.push(vehicle.intColor.nvsName);
            vehicleSql.push(vehicle.intColor.colorFamilies.join(', '));
            vehicleSql.push(vehicle.extColor.marketingName);
            vehicleSql.push(vehicle.extColor.nvsName);
            vehicleSql.push(vehicle.extColor.colorFamilies.join(', '));
            vehicles.push(vehicleSql);
        }
        insertToyota(vehicles);
        
    });
}

export { processToyota };