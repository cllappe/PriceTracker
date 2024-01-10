import { processToyota } from './toyota/processToyotaData.mjs';
import { getToyotaDataRaw } from './toyota/getToyotaData.mjs';

await getToyotaDataRaw();
await processToyota();