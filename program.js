/* Baby Steps
var sum = 0;
for(var i = 2; i < process.argv.length; i++){
    sum += +process.argv[i];
}

console.log(sum);
*/

/* My First I/O
var fs = require('fs');

var strBuf = fs.readFileSync(process.argv[2]).toString();

var len = strBuf.split('\n').length - 1;
console.log(len);
 */

/* My First async I/O 
var fs = require('fs');
fs.readFile(process.argv[2], 'utf8', function(err, data){
   
   if(err){
       console.log("Error occured.");
   }else{
       var len = data.toString().split('\n').length - 1;
       console.log(len);
   }
    
});
*/
/* Filtered LS 
var ls = require('./lsModule.js');
ls(process.argv[2], process.argv[3], function(err, data){
    
    if(err){
        console.log(err);
        console.log("Error")
    }else{
        for(file in data){
            console.log(data[file]);
        }

    }
    
});*/

/*Http client 7/13 
var http = require('http');

http.get(process.argv[2], function(response){
    response.setEncoding('utf8');
    
    var dataString = "";
    
    response.on("data", function(data){
        dataString += data;
        
    });
    response.on("error", console.error);
    
    response.on("end", function(){
        console.log(dataString.length);
        console.log(dataString);
    })
    
});
*/

/* Juggling async 

var http = require('http');

var urls = [process.argv[2], process.argv[3], process.argv[4]];
var holder = [];
var count = 0;

for(var i in urls){
    getData(urls[i], i);
}

function getData(url, i) {
    http.get(url, function(response) {
        response.setEncoding('utf8');
        var dataString = "";
        response.on("data", function(data) {
            dataString += data;
        });
        response.on("error", console.error);
        response.on("end", function() {
            
            holder[i] = dataString;
            count++;
            printAll();
            
        })

    });

};

function printAll(){
  if( count == (process.argv.length - 2)){
    holder.forEach(function(data){
      console.log(data);
      //console.log("Done.");
    });
  }
};
*/

/* Time Server 
var net = require('net');

var server = net.createServer(function(socket){
    var date = new Date();
    var dateStr = "";
    // "YYYY-MM-DD hh:mm" 
    dateStr += date.getFullYear() + "-";
    dateStr += (+date.getMonth() + 1) + "-";
    dateStr += date.getDate() + ' ';
    dateStr += date.getHours() + ':';
    if(+date.getMinutes() < 10){
        dateStr += '0';
    }
    dateStr += date.getMinutes() + '\n';
    socket.end(dateStr)
    
});
server.listen(process.argv[2]);
*/

/* File Server 
var http = require('http');
var fs = require('fs');


var server = http.createServer(function(req, res){
    res.writeHead(200, {'content-type': 'text/plain'});
    fs.createReadStream(process.argv[3]).pipe(res);
});
server.listen(+process.argv[2]);
*/

/*HTTP Uppercaser
var http = require('http');
var map = require('through2-map');

var server = http.createServer(function(req, res){
    //Check that its a post
    if(req.method != 'POST'){
        console.log("need a post request");
        return res.end('send me a POST\n');
    }
    
    req.pipe(map(function (chunk){
        return chunk.toString().toUpperCase();
    })).pipe(res);
    
});
server.listen(+process.argv[2]);
*/

/* JSON Api */
var http = require('http');
var url = require('url');

var server = http.createServer(function (req, res){
    res.writeHead(200, { 'Content-Type': 'application/json' });
    var urlObj = url.parse(req.url, true);
    var time = urlObj.query.iso;
    var dateObj = new Date(time);
    var dateRes = {};
    if(urlObj.pathname.indexOf('parsetime') > 0){
        dateRes = {
            'hour': dateObj.getHours(),
            'minute': dateObj.getMinutes(),
            'second': dateObj.getSeconds()
        }
        
    }else if(urlObj.pathname.indexOf('unixtime') > 0){
        dateRes = {
            'unixtime': dateObj.getTime()
        };
        
    }else{
        console.log("Neither endpoint requested.");
        return res.end("Neither endpoint requested.");
    }
    
    res.write(JSON.stringify(dateRes));
});
server.listen(+process.argv[2]);










