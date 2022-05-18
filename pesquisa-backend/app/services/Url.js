const https = require("https");

class Url {
  // wrap node's https.get stream call as a promise
  // note: assumes utf-8 encoded data payload to get.
  async getdata(url) {
    return new Promise((resolve, reject) => {
      https
        .get(url, (res) => {
          let status = res.statusCode;
          console.log(status);
          res.setEncoding("utf8");
          let data = "";
          res.on("data", (chunk) => {
            data = data + chunk;
          });
          res.on("end", () => {
            if (
              data.indexOf("/wp-admin/") !== -1 ||
              data.indexOf("/wp-content/") !== -1
            )
              resolve({
                status,
                data,
                wp: true,
              });
            else
              resolve({
                status,
                data,
                wp: false,
              });
          });
        })
        .on("error", (e) => {
          console.log(e);
          reject({
            data: false,
          });
        });
    });
  }

  handleGetReturn(res) {}

  sanitizeUrl(url) {
    const urlObject = new URL(url);
    let domain = urlObject.hostname.replace("www.", "");
    domain = domain.replace(/\.com|\.net|\.org|\.info|\.br/gi, "");
    return domain;
  }
}

module.exports = Url;