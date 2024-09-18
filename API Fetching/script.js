let photosData = [];
let currentPage = 1;
const itemsPerPage = 10;
const API_URL = 'https://picsum.photos/v2/list';

// Fetch the data from the API
async function fetchData() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        photosData = data;
        populateAuthorsDropdown();
        renderCards(currentPage);
        setupPagination();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Populate the dropdown with unique authors
function populateAuthorsDropdown() {
    const dropdown = document.getElementById('author');
    const authors = [...new Set(photosData.map(photo => photo.author))];

    authors.forEach(author => {
        const option = document.createElement('option');
        option.value = author;
        option.textContent = author;
        dropdown.appendChild(option);
    });
}

// Filter and render cards based on the current page and author selected
function renderCards(page) {
    const container = document.getElementById('card-container');
    container.innerHTML = ''; 

    const authorFilter = document.getElementById('author').value;
    let filteredData = photosData;

    if (authorFilter) {
        filteredData = photosData.filter(photo => photo.author === authorFilter);
    }

    // Calculate the range of items to display on the current page
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = page * itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    // Render the paginated cards
    paginatedData.forEach(photo => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${photo.download_url}" alt="${photo.author}">
            <h3>${photo.author}</h3>
            <p>Width: ${photo.width}, Height: ${photo.height}</p>
            <a href="${photo.url}" target="_blank">View on Unsplash</a>
        `;
        container.appendChild(card);
    });

    setupPagination(filteredData.length); 
}

// Set up pagination controls
function setupPagination(totalItems = photosData.length) {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = ''; 

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.classList.add('pagination-btn');
        pageButton.addEventListener('click', () => {
            currentPage = i;
            renderCards(currentPage);
        });

        if (i === currentPage) {
            pageButton.classList.add('active');
        }

        paginationContainer.appendChild(pageButton);
    }
}

// Filter the cards when the author dropdown changes
function filterCards() {
    currentPage = 1; 
    renderCards(currentPage);
}

document.addEventListener('DOMContentLoaded', () => {
    fetchData();
});
