import { gql, GraphQLClient} from 'graphql-request';
import { firefox  } from 'playwright';
import * as fs from 'node:fs';


let validHeaders = null; 
function interceptRequest(request) {
  if (request.url().includes('graphql')){
    validHeaders = request.headers();
  }
  return request
}

async function getValidHeaders() {
  const browser = await firefox.launch();
  const page = await browser.newPage();
  page.on("request", interceptRequest);
  await page.goto('https://www.toyota.com/search-inventory');
  await page.getByPlaceholder("ZIP Code").fill("80919");
  await page.click("button[type='submit']");
  await page.waitForLoadState("networkidle");
  await browser.close();
}

const query = gql`
  query
  {
      locateVehiclesByZip
      (
          zipCode: "80919"
          brand: "TOYOTA"
          pageNo: 1
          pageSize: 250
          seriesCodes: "highlanderhybrid"
          distance: 25
          
      ) 
      {
          pagination {
            pageNo
            pageSize
            totalPages
            totalRecords
          }
          vehicleSummary {
            vin
            stockNum
            brand
            marketingSeries
            year
            isTempVin
            dealerCd
            dealerCategory
            distributorCd
            holdStatus
            weightRating
            isPreSold
            dealerMarketingName
            dealerWebsite
            isSmartPath
            distance
            isUnlockPriceDealer
            transmission {
              transmissionType
            }
            price {
              advertizedPrice
              nonSpAdvertizedPrice
              totalMsrp
              sellingPrice
              dph
              dioTotalMsrp
              dioTotalDealerSellingPrice
              dealerCashApplied
              baseMsrp
            }
            options {
              optionCd
              marketingName
              marketingLongName
              optionType
              packageInd
            }
            model {
              modelCd
              marketingName
              marketingTitle
            }
            intColor {
              colorCd
              colorSwatch
              marketingName
              nvsName
              colorFamilies
            }
            extColor {
              colorCd
              colorSwatch
              marketingName
              colorHexCd
              nvsName
              colorFamilies
            }
            engine {
              engineCd
              name
            }
            drivetrain {
              code
              title
              bulletlist
            }
          }
      }
  }
`;

async function getToyotaDataRaw(){
    await getValidHeaders();

    const graphqlClient = new GraphQLClient('https://api.search-inventory.toyota.com/graphql',{
      headers: validHeaders,
      method: 'POST',
      jsonSerializer: {
        parse: JSON.parse,
        stringify: JSON.stringify,
      }
    });

    const results = await graphqlClient.request(query);
    fs.writeFile('resultsToyota.json', JSON.stringify(results), err => {
        if (err) {
            console.error(err)
            return
        }});

};

export { getToyotaDataRaw };