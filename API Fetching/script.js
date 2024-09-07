let allCards = []; // To store all card data

// Fetch card data from the API
async function fetchCards() {
    try {
        const response = await fetch('https://picsum.photos/v2/list'); // Replace with your API endpoint
        const cards = await response.json();
        allCards = cards; // Store the cards globally

        populateAuthors(cards);
        displayCards(cards);
    } catch (error) {
        console.error('Error fetching cards:', error);
    }
}

// Populate author dropdown with unique author names
function populateAuthors(cards) {
    const authorDropdown = document.getElementById('author');
    const authors = [...new Set(cards.map(card => card.author))]; // Get unique authors

    authors.forEach(author => {
        const option = document.createElement('option');
        option.value = author;
        option.textContent = author;
        authorDropdown.appendChild(option);
    });
}

// Display the fetched cards
function displayCards(cards) {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = ''; // Clear previous cards

    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');

        cardElement.innerHTML = `
            <img src="${card.download_url}" alt="Image">
            <h3>${card.author}</h3>
            <a href="${card.url}" target="_blank">${card.url}</a>
            <p>Width: ${card.width}, Height: ${card.height}</p>
        `;

        cardContainer.appendChild(cardElement);
    });
}

// Filter cards based on selected author
function filterCards() {
    const selectedAuthor = document.getElementById('author').value;
    const filteredCards = selectedAuthor 
        ? allCards.filter(card => card.author === selectedAuthor) 
        : allCards; // Show all cards if no author is selected
    displayCards(filteredCards);
}

// Fetch cards on page load
document.addEventListener('DOMContentLoaded', () => {
    fetchCards(); // Fetch and display all cards on load
});
