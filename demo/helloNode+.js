var http = require('http')
    , mysql = require('mysql')
    , client = mysql.createClient({
      user: 'root'
    });  

client.query('use castle;');

http.createServer(function (req, res) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      client.query('select * from dragons',function (err,data) {
                if (err) { 
                        res.end('ERROR'); 
                    } else { 
                      res.end(JSON.stringify(data));
                        }
          });
      }).listen(8124, '127.0.0.1');
      console.log('Server running at http://127.0.0.1:8124/');
