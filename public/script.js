document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/content')
        .then(response => response.json())
        .then(data => {
            // Logic to display data on the page
            console.log(data);
            // Example: document.getElementById('content').innerHTML = data.content;
        })
        .catch(error => console.error('Error fetching content:', error));
});