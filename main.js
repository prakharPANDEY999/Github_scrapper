let url = "https://github.com/topics";
const request = require("request");
const cheerio = require("cheerio");
const getReposPageHtml = require("./reposPage");


request(url, cb);
function cb(err, response, html){
    if(err){
        console.log("error");
    }
    else if(request.statusCode ==404){
        console.log("page not found");
    }
    else{
        getTopicslinks(html);
    }
}
function getTopicslinks(html){
    let $ = cheerio.load(html);
    let linkEleArr = $(".no-underline.d-flex.flex-column.flex-justify-center");
    for(let i=0; i<linkEleArr.length; i++){
        let href = $(linkEleArr[i]).attr("href");
        // console.log(href);
        // let fullLink = "https://github.com" + href;
        let topic = href.split("/").pop();
        let fullLink = `https://github.com/${href}`; // naya tareeka
        getReposPageHtml(fullLink, topic);
    }
}