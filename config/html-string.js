const util = require('util');

const htmlstring = `<html><head><title>demo-app</title></head><body><table><tr><th>Equipment_Number</th><th>Address</th><th>Contract_Start_Date </th><th> Contract_End_Date </th><th> Status </th></tr> %s </table></body></html>`;
const rowString = `<tr><td>%s</td><td>%s</td><td>%s</td><td>%s</td><td>%s</td></tr>`;

const buildHtml = function(input){
    let rowData = '';
    input.forEach((element) => {
        if(element.doc){
            element = element.doc;
        }
        rowData += util.format(rowString, element.equipmentNum, element.address, element.contractStartDate, element.contractEndDate, element.status);
    });
    return util.format(htmlstring, rowData);
}

module.exports = buildHtml;