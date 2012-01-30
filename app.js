var
  http = require('http'),
  yxorp = function(req, res) {

    delete req.headers["accept-encoding"];

    var
      options = {
        host: 'wandb.org',
        port: 80,
        headers: req.headers,
        path: req.url,
        method: req.method
      },
      proxyRequest = http.request(options, function(proxyResponse) {

        if(/html/.test(proxyResponse.headers["content-type"])) {
          delete proxyResponse.headers["content-encoding"];
          delete proxyResponse.headers["content-length"];
          // proxyResponse.headers["transfer-encoding"] = "chunked";

          res.writeHead(proxyResponse.statusCode, proxyResponse.headers);

          proxyResponse.on('data', function(chunk) {
            chunk = chunk.toString();
            chunk = chunk.replace(/wandb/gi, 'tg');
            res.write(chunk);
          });

          proxyResponse.on('end', res.end.bind(res));
        } else {
          proxyResponse.pipe(res);
          res.writeHead(proxyResponse.statusCode, proxyResponse.headers);
        }

      });

    req.pipe(proxyRequest);
  };

http.createServer(yxorp).listen(8080);
