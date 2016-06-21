var DOMParser = require('xmldom').DOMParser;
var path = require('path');
var rf=require("fs");
 var xml2js = require('xml2js');

var fdb_path = path.join(__dirname, './others/JH_LS.xml');
console.log(fdb_path);

var xml = rf.readFileSync(fdb_path, "utf-8");
console.log(xml);
var parser = new xml2js.Parser();   //xml -> json
var json =  parser.parseString(xml);

console.log(json);
// console.log("READ FILE SYNC END");
//
// var doc = new DOMParser().parseFromString(
//     '<xml xmlns="a" xmlns:c="./lite">\n'+
//         '\t<child>test</child>\n'+
//         '\t<child></child>\n'+
//         '\t<child/>\n'+
//     '</xml>'
//     ,'text/xml');
// doc.documentElement.setAttribute('x','y');
// doc.documentElement.setAttributeNS('./lite','c:x','y2');
// var nsAttr = doc.documentElement.getAttributeNS('./lite','x')
// var nsAttr2 = doc.documentElement.getAttributeNS('./lite','c:x')
// console.info(nsAttr)
// console.log(nsAttr2);
// console.info(doc)
