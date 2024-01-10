import { firefox } from "playwright";
import axios from "axios";
import * as fs from 'node:fs';

let validHeaders = null;
function interceptRequest(request) {
  if (request.url().includes("v1/vehicles/search")) {
    validHeaders = request.headers();
  }
  return request;
}

async function getValidHeaders() {
  const browser = await firefox.launch();
  const page = await browser.newPage();
  page.on("request", interceptRequest);
  await page.goto(
    "https://www.cadillac.com/shopping/inventory/search/lyriq/2024?paymentType=CASH&radius=40&sort=distance%2CASC&zipCode=80919"
  );
  await page.waitForLoadState("networkidle");
  await browser.close();
}

async function getCadillacDataRaw() {
  await getValidHeaders();
  let axiosConfig = {
        headers: validHeaders
  }
   axios.post(
    "https://www.cadillac.com/cadillac/shopping/api/aec-cp-discovery-api/p/v1/vehicles/search",
    {
      filters: {
        year: { values: ["2024"] },
        model: { values: ["lyriq"] },
        geo: { zipCode: "80919", radius: 40 },
      },
      sort: { name: "distance", order: "ASC" },
      paymentTypes: ["CASH"],
      pagination: { size: 99 },
    },
    axiosConfig
  ).then((response) => {
    fs.writeFile('resultsCadillac.json', JSON.stringify(response.data), function (err) {
      if (err) throw err;
    });
  });
}

export { getCadillacDataRaw };
