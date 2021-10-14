const request = require("request");
const cheerio = require("cheerio");
const getIssuesPageHtml = require("./issues.js");
function getReposPageHtml(url, topic){
   request(url, cb)
   function cb(err, response, html){
       if(err){
           console.log("error");
       }
       else if(request.statusCode ==404){
        console.log("page not found");
    }
       else{
           getReposLink(html);
       }
   }
   function getReposLink(html){
    //   console.log(html);   
     let $ = cheerio.load(html);
     let headingArray = $(".f3.color-text-secondary.text-normal.lh-condensed");
     console.log(topic);
     for(let i=0; i<8; i++){
        let twoanchors = $(headingArray).find("a");
         let link = $(twoanchors[1]).attr("href");
        //  console.log(link);
        let fullLink = `https://github.com${link}/issues`;
        // console.log(fullLink);
        let repoName = link.split("/").pop(); 

        getIssuesPageHtml(fullLink, topic, repoName);
     }
     console.log("........................");
   }
}
module.exports = getReposPageHtml;