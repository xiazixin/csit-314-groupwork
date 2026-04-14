// autoindex.js
// Express route to serve a dynamic directory index for the project root

const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const ROOT_DIR = path.resolve(__dirname);

router.get('/autoindex', (req, res) => {
    fs.readdir(ROOT_DIR, { withFileTypes: true }, (err, files) => {
        if (err) return res.status(500).send('Error reading directory');
        let html = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Directory Index</title><style>body{font-family:Arial,sans-serif;margin:2em;}h1{color:#333;}ul{list-style:none;padding:0;}li{margin:0.5em 0;}a{text-decoration:none;color:#007bff;}a:hover{text-decoration:underline;}</style></head><body><h1>Directory Index</h1><ul>`;
        files.forEach(file => {
            if (file.name === 'node_modules') return;
            const slash = file.isDirectory() ? '/' : '';
            html += `<li><a href="${file.name}${slash}">${file.name}${slash}</a></li>`;
        });
        html += '</ul></body></html>';
        res.send(html);
    });
});

module.exports = router;
