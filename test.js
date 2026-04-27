// test.js
// Express router to serve a simple test page and CRUD endpoints for test.json

const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const TEST_FILE = path.join(__dirname, 'test.json');

function readItems() {
    if (!fs.existsSync(TEST_FILE)) return [];
    const data = fs.readFileSync(TEST_FILE, 'utf8');
    try {
        return JSON.parse(data);
    } catch {
        return [];
    }
}

function writeItems(items) {
    fs.writeFileSync(TEST_FILE, JSON.stringify(items, null, 2));
}

router.get('/test', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Test List</title>
        <link rel="stylesheet" href="/bootstrap.css">
    </head>
    <body>
        <div class="container mt-5">
            <h2 class="mb-4">Test Input</h2>
            <form id="testForm" class="row g-3">
                <div class="col-md-8">
                    <input type="text" class="form-control" id="testInput" placeholder="Type something" required>
                </div>
                <div class="col-md-4">
                    <button type="submit" class="btn btn-primary w-100">Add</button>
                </div>
            </form>
            <div class="mt-4">
                <h4>Items</h4>
                <ul id="testList" class="list-group"></ul>
            </div>
        </div>
        <script src="/testserver.js"></script>
    </body>
    </html>
    `);
});

router.get('/test/api/items', (req, res) => {
    const items = readItems();
    res.json(items);
});

router.post('/test/api/items', (req, res) => {
    const { text } = req.body;
    if (!text || !text.trim()) {
        return res.status(400).json({ error: 'Text is required.' });
    }
    const items = readItems();
    const newItem = { id: Date.now(), text: text.trim() };
    items.push(newItem);
    writeItems(items);
    res.json({ success: true, item: newItem });
});

router.delete('/test/api/items/:id', (req, res) => {
    const id = Number(req.params.id);
    if (!id) {
        return res.status(400).json({ error: 'Invalid id.' });
    }
    const items = readItems();
    const nextItems = items.filter(item => item.id !== id);
    writeItems(nextItems);
    res.json({ success: true });
});

module.exports = router;
