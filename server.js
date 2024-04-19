const http = require("http");
const fs = require("fs");
const url = require("url");
const querystring = require("querystring");
const path = require("path");
const figlet = require("figlet");

const server = http.createServer((req, res) => {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  const extName = path.extname(page);
  console.log(page);
  if (page == "/") {
    fs.readFile("index.html", function (err, data) {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    });
  } else if (page == "/otherpage") {
    fs.readFile("otherpage.html", function (err, data) {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    });
  } else if (page == "/otherotherpage") {
    fs.readFile("otherotherpage.html", function (err, data) {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    });
  } else if (page == "/api") {
    if ("student" in params) {
      if (params["student"].toLowerCase().includes("papa john")) {
        res.writeHead(200, { "Content-Type": "application/json" });
        const objToJson = {
          response: "You mean dominos, right...",
          audioResponse: "../audio/leon_get_the_beep_out.mp3",
        };
        res.end(JSON.stringify(objToJson));
      } else {
        let randomNumber = Math.floor(Math.random() * 7);
        const audioResponses = {
          "Yuh!": "../audio/yuh.mp3",
          "Let's Go!": "../audio/letsgo.mp3",
          "First tryyy!": "../audio/first-try.mp3",
          "That's wild.": "../audio/thatswild.mp3",
          "What?!": "../audio/what.mp3",
          "You got got... 🦆": "../audio/quack.mp3",
          "Who's gonna carry the boats and logs??": "../audio/boatslogs.mp3",
        };

        res.writeHead(200, { "Content-Type": "application/json" });
        const responseToReturn = Object.keys(audioResponses)[randomNumber];
        const objToJson = {
          response: responseToReturn,
          audioResponse: audioResponses[responseToReturn],
        };
        res.end(JSON.stringify(objToJson));
      }
    }
  } else if (page == "/css/style.css") {
    fs.readFile("css/style.css", function (err, data) {
      res.write(data);
      res.end();
    });
  } else if (page == "/js/main.js") {
    fs.readFile("js/main.js", function (err, data) {
      res.writeHead(200, { "Content-Type": "text/javascript" });
      res.write(data);
      res.end();
    });
  } else if (page == "/images/leonthegenie.jpg") {
    fs.readFile("images/leonthegenie.jpg", function (err, data) {
      res.writeHead(200, { "Content-Type": "image/jpg" });
      res.write(data);
      res.end();
    });
  } else if (extName == ".mp3") {
    console.log("page", page);
    fs.readFile(page.slice(1), function (err, data) {
      if (err) {
        console.log(err);
      }
      res.writeHead(200, { "Content-Type": "audio/mpeg" });
      res.write(data);
      res.end();
    });
  } else {
    figlet("404!!", function (err, data) {
      if (err) {
        console.log("Something went wrong...");
        console.dir(err);
        return;
      }
      res.write(data);
      res.end();
    });
  }
});

server.listen(8000);
