// const Microformats = require('microformat-node');
// const request = require('request');

// const options = {};

// function microformatScraper(url) {
//   return new Promise((resolve, reject) => {
//     request(url, (error, response, html) => {
//       if (!error && response.statusCode === 200) {
//         options.html = html;
//         Microformats.get(options, (err, data) => {
//           resolve(data.items[0]);
//         });
//       } else if (error) reject(error);
//       else reject(`Status code: ${response.statusCode}`)
//     });
//   });
// }

// module.exports = {
//   microformatScraper,
// };
