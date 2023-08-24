const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const port = process.env.PORT || 3000;

app.get('/api/release-notes', async (req, res) => {
  try {
    // URL of the website to scrape
    const url = 'https://www.outsystems.com/forge/component-overview/1385/outsystems-ui';

    // Send an HTTP GET request to the URL
    const response = await axios.get(url);

    // Load the HTML content using Cheerio
    const $ = cheerio.load(response.data);

    // Find the specific div element by its inline style
    const targetDiv = $('div[style="padding: 15px; background-color: rgb(253, 246, 229); margin-bottom: 20px"]');

    // Extract the inner HTML of the div
    const divContent = targetDiv.html();

    // Send the div content in the response
    if (divContent) {
      res.send(divContent);
    } else {
      res.status(404).send('Div content not found on the page.');
    }
  } catch (error) {
    console.error('Error scraping the website:', error);
    res.status(500).send('Internal server error.');
  }
});

app.listen(port, () => {
  console.log(`API server is running on port ${port}`);
});
