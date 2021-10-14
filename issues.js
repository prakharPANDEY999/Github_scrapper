const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const pdfKit = require("pdfKit");
function getIssuesPageHtml(url, topic, repoName){
    request(url, cb)
    function cb(err, response, html){
        if(err){
            console.log("error");
        }
        else if(request.statusCode == 404){
            console.log("page not found");
        }
        else{
            getIssues(html);
        }
    }
    function getIssues(html){
        let $ = cheerio.load(html);
        let issuesElemArr = $(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title");
        //  let issuesEleArr = $(".js-navigation-open.Link--primary");
    
        console.log(issuesElemArr.length);
        let arr = [];
        for(let i=0; i < issuesElemArr.length; i++){
            let link = $(issuesElemArr[i]).attr("href");
            // console.log(link); 
             arr.push(link);
        }
        console.log(repoName, topic,"......................", arr);
        let folderPath = path.join(__dirname, topic); // created a folder of name topic
        dirCreater(folderPath);
        let filePath = path.join(folderPath, repoName + ".pdf"); // created file of name repoName
        let text = JSON.stringify(arr);
        let pdfDoc = new pdfKit();
        pdfDoc.pipe(fs.WriteStream(filePath));
        pdfDoc.text(text);
        pdfDoc.end();
        //  fs.writeFileSync(filePath, JSON.stringify(arr));

    }
}
module.exports = getIssuesPageHtml;
function dirCreater(folderPath){
    if(fs.existsSync(folderPath)==false){ // check if path of (folder) exists
         fs.mkdirSync(folderPath);
    }
}
