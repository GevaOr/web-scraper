
# web-scraper

A simple web scraper I made using Cheerio.
At the moment, the scraping information is hard coded, I hope to improve the usability moving forward.


## Scraping information

This is the hard-coded information that needs to be edited:

| Variable|Type|What is it for?|Example for use|
|-|-|-|-|
|filename|string|Filename to write the data to|`very_important`|
|fileExt|string|File extension|`.csv`|
|url|string|URL to scrape|`http://www.mywebsite.io/`|      
|htmlQuery|string|A query to search|`.item` (an element with the class "item")|
|headers|Array|Headers to be added to the csv/xls file if needed (can be left as an emty array if irrelevant)|`["name", "location", "phone"]`|

## Running the app

* Clone the repo.
* Add scraping information.
* Add scraping logic.
* `npm run scrape`