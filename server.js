const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/mobile', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'workbench-mobile.html'));
});

app.get('/desktop', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'workbench-desktop.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'workbench-desktop.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
