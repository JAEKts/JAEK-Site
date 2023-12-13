const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/save', (req, res) => {
  const markdownContent = req.body.markdownContent;
  fs.writeFileSync('output.txt', markdownContent);
  res.send('File saved successfully!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

app.get('/load', (req, res) => {
  try {
    const content = fs.readFileSync('output.txt', 'utf-8');
    res.send(content);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error loading content');
  }
});
