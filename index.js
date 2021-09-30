const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const fs = require('fs');

const PORT = 5555;

const app = express();

const filename = ''; // filename to write to (without extension)
const url = ""; // URL to scrape
const htmlClassQuery = ""; // Class of the HTML element to scrape
const headers = [];  // Array of header titles in the xls file. Example: ['Title', 'Description', 'Link'...]

const createHeaderRowString = (headers) => {
    const headerRow = '';
    headers.forEach((header) => {
        headerRow += `${capitalizeFirstLetter(header)}`;
    });
    headerRow += '\n';
    return headerRow;
}

const addHeaderRow = (headers, fileStream) => {
    if (headers.length < 1) {
        return;
    }
    const headerRow = createHeaderRowString(headers);
    fileStream.write(headerRow);
    // fileStream.end();
};

capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

axios(url)
    .then(resp => {
        const scrapedHtml = resp.data;
        const $ = cheerio.load(scrapedHtml);
        let stream = fs.createWriteStream(`${filename}.xls`);

        addHeaderRow(headers, stream);

        $(`.${htmlClassQuery}`)
            .each(() => {
                // stream.write($(this).text().trim() + "\t");
                // Add relevant code here
            })

        stream.end();
    })
    .catch(err => { console.error("An error occured while trying to scrape\n", err) });

app.listen(PORT, () => console.log(`server running on port: ${PORT}`));