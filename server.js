const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const buildPath = path.join(__dirname, 'frontend', 'build');
app.use(express.static(buildPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Frontend is being served on http://localhost:${PORT}`);
});
