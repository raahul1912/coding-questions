const https = require("https");
 
const countAges = async (minAge = 50) => {
  return new Promise((resolve, reject) => {
    https.get("https://coderbyte.com/api/challenges/json/age-counting", resp => {
      let data = "";

      resp.on("data", chunk => (data += chunk));
      resp.on("end", () => {
        try {
          const json = JSON.parse(data);
          const records = json.data.split(",").map(s => s.trim());
          const ages = records
            .filter(r => r.startsWith("age"))
            .map(r => parseInt(r.split("=")[1]));
          const count = ages.filter(a => a >= minAge).length;
          resolve(count);
        } catch (err) {
          reject(err);
        }
      });
    }).on("error", reject);
  });
};

module.exports = { countAges };
// Example run
countAges().then(console.log);
