var http = require('http')
    , mysql = require('mysql')
    , client = mysql.createClient({
      user: 'root',
        password: 'root',
    });  

client.query('use castle;');

http.createServer(function (req, res) {
      res.writeHead(200, {'Content-Type': 'text/json'});
      client.query('select * from dragons',function (err,data) {
                if (e) { 
                        res.end('ERROR'); 
                    } else { 
                      res.end(JSON.stringify(d));
                        }
          });
      }).listen(8124, '127.0.0.1');
      console.log('Server running at http://127.0.0.1:8124/');
