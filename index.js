const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const fs = require('fs');

const PORT = 5555;

const app = express();

// ---------------------------------------------------------------------------------------------------------
const FILENAME = ''; // filename to write to (without extension)
const FILE_EXT = 'csv'; // file extension, without the period
const URL = ""; // URL to scrape
const htmlQuery = ""; // HTML query to scrape. Example: `li`, `li.element`, `.title`, etc.
const headers = [];  // Array of header titles in the csv file. Example: ["name", "location", "phone"...] - can be left as an empty array if not needed.
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

const createFileStream = (filename, FileExtension) => {
    return fs.createWriteStream(`${filename}.${FileExtension}`);
}

const scrapeUrl = async (url, query) => {
    console.log(`Scraping ${url}`);
    const stream = createFileStream(FILENAME, FILE_EXT);
    addHeaderRow(headers, stream);

    console.log(`${FILENAME}.${FILE_EXT} stream created`);

    await axios(url)
        .then(resp => {
            const html = resp.data;
            const $ = cheerio.load(html);

            // Add logic to scrape data from the HTML and write to the file stream.
            // ---------------------------------------------------------------------
            // For example:
            // $(`${query}`)
            //     .each((_i, elem) => {
            //         const name = $(elem).find('.name').text();
            //         const location = $(elem).find('.location').text();
            //         const phone = $(elem).find('.phone').text();
            //         stream.write(`"${name}","${location}","${phone}"\n`);
            //     })
            // ---------------------------------------------------------------------

        })
        .catch(err => { console.error("An error occured while trying to scrape\n", err) });

    stream.end();
    console.log(`${FILENAME}.${FILE_EXT} stream ended`);

}

// V Run the scrape function V
// scrapeUrl(URL, htmlQuery);
// console.log('Scrape complete');

app.listen(PORT, () => console.log(`server running on port: ${PORT}`));