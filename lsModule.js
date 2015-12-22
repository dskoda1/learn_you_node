
/*
   » Export a single function that takes exactly the arguments described.      
   » Call the callback exactly once with an error or some data as described.     
   » Don't change anything else, like global variables or stdout.              
   » Handle all the errors that may occur and pass them to the callback.  
*/
var fs = require('fs');


//Take dir name, extension to filter by, and callback
module.exports = function(dir, ext, cb) {
    //Get the files at that directory, and filter
    fs.readdir(dir, function(err, list){
        if(err){
            cb("Error occurred.", null);
            console.log("Error occurred.");
        }
        else{
            //console.log(list);
            var filteredFiles = list.filter(checkExt(ext));
            cb(null, filteredFiles);
        }
    });
    
};

function checkExt(ext){
    return function(file){
        if(ext.indexOf('.') === -1){
            ext = ('.').concat(ext);
        }
        
        var len = ext.length;
        var fileEnding = file.substring(file.length - len);
        return fileEnding === ext;
    };
}

