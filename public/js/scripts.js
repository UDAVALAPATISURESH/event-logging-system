
const logEventForm = document.getElementById('logEventForm');
const eventLogsContainer = document.getElementById('eventLogsContainer');
const loadLogsButton = document.getElementById('loadLogsButton');


logEventForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    
    const eventType = document.getElementById('eventType').value;
    const sourceAppId = document.getElementById('sourceAppId').value;
    const data = document.getElementById('data').value;

    
    const eventData = {
        eventType,
        sourceAppId,
        data: {
            description: data
        }
    };

    try {
        
        const response = await fetch('http://localhost:5000/api/log', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventData)
        });

        const result = await response.json();

        if (response.status === 201) {
            alert('Event logged successfully!');
            logEventForm.reset(); 
        } else {
            alert(`Error: ${result.error}`);
        }
    } catch (error) {
        alert('Failed to log event. Please check your connection or server.');
    }
});


loadLogsButton.addEventListener('click', async () => {
    try {
   
        const response = await fetch('http://localhost:5000/api/logs');
        const logs = await response.json();

       
        eventLogsContainer.innerHTML = '';

       
        logs.forEach((log) => {
            const logElement = document.createElement('div');
            logElement.classList.add('log-entry');
            logElement.innerHTML = `
                <p><strong>Event Type:</strong> ${log.eventType}</p>
                <p><strong>Source App ID:</strong> ${log.sourceAppId}</p>
                <p><strong>Data:</strong> ${JSON.stringify(log.data)}</p>
                <hr />
            `;
            eventLogsContainer.appendChild(logElement);
        });
    } catch (error) {
        alert('Failed to load event logs. Please check your connection or server.');
    }
});
