import cron from 'node-cron';

import { processToyota } from './toyota/processToyotaData.mjs';
import { getToyotaDataRaw } from './toyota/getToyotaData.mjs';
import { processCadillac } from './cadillac/processCadillacData.mjs';
import { getCadillacDataRaw } from './cadillac/getCadillacData.mjs';

cron.schedule('0 6 * * * *', async () => {
    await getToyotaDataRaw();
    await processToyota();
    await getCadillacDataRaw();
    await processCadillac();
});