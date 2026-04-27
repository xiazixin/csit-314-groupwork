// testserver.js
// Client-side logic for the /test page

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('testForm');
    const input = document.getElementById('testInput');
    const list = document.getElementById('testList');

    if (!form || !input || !list) return;

    function renderItems(items) {
        list.innerHTML = '';
        if (!Array.isArray(items) || items.length === 0) {
            const empty = document.createElement('li');
            empty.className = 'list-group-item';
            empty.textContent = 'No items yet.';
            list.appendChild(empty);
            return;
        }

        items.forEach(item => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.textContent = item.text;

            const btn = document.createElement('button');
            btn.className = 'btn btn-sm btn-danger';
            btn.textContent = 'Delete';
            btn.addEventListener('click', function () {
                deleteItem(item.id);
            });

            li.appendChild(btn);
            list.appendChild(li);
        });
    }

    function loadItems() {
        fetch('/test/api/items')
            .then(response => response.json())
            .then(renderItems)
            .catch(() => {
                list.innerHTML = '<li class="list-group-item text-danger">Failed to load items.</li>';
            });
    }

    function addItem(text) {
        return fetch('/test/api/items', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text })
        })
            .then(response => response.json());
    }

    function deleteItem(id) {
        fetch(`/test/api/items/${id}`, { method: 'DELETE' })
            .then(() => loadItems())
            .catch(() => {
                list.innerHTML = '<li class="list-group-item text-danger">Failed to delete item.</li>';
            });
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const text = input.value.trim();
        if (!text) return;

        addItem(text)
            .then(data => {
                if (data && data.success) {
                    input.value = '';
                    loadItems();
                } else {
                    alert(data.error || 'Failed to add item.');
                }
            })
            .catch(() => {
                alert('Server error. Please try again later.');
            });
    });

    loadItems();
});
