
var config = require('./config.json');
var Request = require("request");
var response = "";
var this_url = "" ;


exports.handler = (event, context, callback) =>{

  console.log('[EVENT] ', event);

  response = "";
  this_url = "https://api.knack.com/v1/objects/" ; //object_xx/records"

  var parms = event ;
  var knackobj = parms.knackobj ;
  var appid = parms.appid ;
  this_url = this_url + knackobj + '/records';

  var KnackToken = config.knack[0].knackToken;

  for (let i = 0; i < config.knack.length; i++) {
    if (config.knack[i].appid == appid){
        KnackToken = config.knack[i].knackToken ;
        break ;
    }
}

  var headers = { "X-Knack-Application-ID":appid, "X-Knack-REST-API-KEY":  KnackToken, "Content-Type":"application/json"};
  var response ="";

  if (parms.method == 'get') {
    getRequest ( headers, parms)
     	.then (result => {
         {
              var response = {
                 statusCode: 200,
                 body: JSON.parse(result) //JSON.stringify(result, null, 2)
               };
                callback(null, response) ;
            }
            //else
            //    callback(error,body);

        });
    }
 else if (parms.method == 'post') {
    response = postRequest ( headers, parms) ;
  }


}

function getRequest (headers, parms)
{
		return new Promise ((resolve, reject) => {

        var filters = "" ;
        console.log (this_url);
        this_url = this_url + '?filters=' + encodeURIComponent(JSON.stringify(parms.filters));

        // Configure the request
        var options = {
            url: this_url,
            method: 'GET',
            headers: headers
        }

        // Start the request
        Request(options, function (error, response, body) {

            if (!error && response.statusCode == 200)
                resolve(body) ;
            else
                reject(error);

        });
      })

}

function postRequest (headers, parms) {
    Request.post({
        "headers": headers,
        "url": this_url,
        "body": JSON.stringify(parms.record)
    }, (error, response, body) => {
        if(error) {
            return console.dir(error);
        }
        console.dir(JSON.parse(body));
    });
}
