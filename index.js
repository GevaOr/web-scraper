const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const fs = require('fs');

const PORT = 5555;

const app = express();

// ---------------------------------------------------------------------------------------------------------
const filename = ''; // filename to write to (without extension)
const fileExt = '.csv'; // file extension
const url = ""; // URL to scrape
const htmlQuery = ""; // HTML query to scrape
const headers = [];  // Array of header titles in the csv file. Example: ["name", "location", "phone"...]
// ---------------------------------------------------------------------------------------------------------

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};


const createHeaderRowString = (headers) => {
    let headerRow = '';
    headers.forEach((header) => {
        headerRow += `"${capitalizeFirstLetter(header)}",`;
    });
    headerRow = headerRow.substring(0, headerRow.length - 1) + "\n";  // remove trailing comma and add newline
    return headerRow;
}

const addHeaderRow = (headers, fileStream) => {
    if (headers.length < 1) {
        return;
    }
    const headerRow = createHeaderRowString(headers);
    fileStream.write(headerRow);
};

axios(url)
    .then(resp => {
        const html = resp.data;
        const $ = cheerio.load(html);
        let stream = fs.createWriteStream(`${filename}.${fileExt}`);

        addHeaderRow(headers, stream);

        // Add logic to scrape data from the HTML and write to the file stream.
        // ---------------------------------------------------------------------
        // For example:
        // $('${htmlQuery}')
        //     .each((_i, elem) => {
        //         const name = $(elem).find('.name').text();
        //         const location = $(elem).find('.location').text();
        //         const phone = $(elem).find('.phone').text();
        //         stream.write(`"${name}","${location}","${phone}"\n`);
        //     })
        // ---------------------------------------------------------------------

        stream.end();
    })
    .catch(err => { console.error("An error occured while trying to scrape\n", err) });

app.listen(PORT, () => console.log(`server running on port: ${PORT}`));