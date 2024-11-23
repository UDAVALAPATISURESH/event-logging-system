document.getElementById('logEventForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const eventType = document.getElementById('eventType').value;
    const sourceAppId = document.getElementById('sourceAppId').value;
    const data = JSON.parse(document.getElementById('data').value);

    const newEvent = { eventType, sourceAppId, data };

    fetch('/api/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEvent),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        document.getElementById('logEventForm').reset();
    })
    .catch(error => console.error('Error:', error));
});

document.getElementById('loadLogs').addEventListener('click', function() {
    fetch('/api/logs')
    .then(response => response.json())
    .then(data => {
        const eventLogs = document.getElementById('eventLogs');
        eventLogs.innerHTML = '';

        data.forEach(event => {
            const li = document.createElement('li');
            li.textContent = `${event.timestamp}: ${event.eventType} - ${event.data.user} (${event.sourceAppId})`;
            eventLogs.appendChild(li);
        });
    })
    .catch(error => console.error('Error:', error));
});
