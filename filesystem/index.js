const fs = require('fs');
const file ={
    ifExists : function(filename){
        fs.open(filename, 'r', (err, fd) => {
            if (err) {
              if (err.code === 'ENOENT') {
                console.error("the file" +filename + 'at path does not exist');
                return false;
              }
            }
        });
}
}

file.open = function(){

}


module.exports = {file:file,fs:fs};