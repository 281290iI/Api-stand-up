export const readRequestBody = (req) =>
  new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      console.log(body);
      resolve(body);
    });

    req.on("error", (err) => {
      reject(err);
    });
  });
