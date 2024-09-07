let allCards = []; 

// Fething data from the API
async function fetchCards() {
    try {
        const response = await fetch('https://picsum.photos/v2/list'); 
        const cards = await response.json();
        allCards = cards; 

        populateAuthors(cards);
        displayCards(cards);
    } catch (error) {
        console.error('Error fetching cards:', error);
    }
}

// Populate author dropdown author names
function populateAuthors(cards) {
    const authorDropdown = document.getElementById('author');
    const authors = [...new Set(cards.map(card => card.author))];

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
    cardContainer.innerHTML = '';
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
        : allCards;
    displayCards(filteredCards);
}

// Fetch cards on page load
document.addEventListener('DOMContentLoaded', () => {
    fetchCards();
});
