const request = require('request-promise');
const model = require('../model')

module.exports = {
    add: function(req, res, next){
        let api_lua = "http://localhost:8888/filevmx"; // TODO make configurable
        let file_content = req.file.buffer.toString('utf8');

        var options = {
          method:"POST",
          uri: api_lua,
          body:{
            conteudo: file_content
          },
          headers: {
            "Content-Type" : "application/json"
          },
          json:true
        };

        request(options)
        .then(response => {
            res.send({success: true, content: response});
        })
        .catch(error => {
            res.send({success: false, error: error});
        })
    }
}
