// Replace with your Google Sheets API key and spreadsheet ID
const API_KEY = 'AIzaSyB8oY4egE6zybQKjUJMtIFATgVXUTvYku0';
const SPREADSHEET_ID = '1KUVQoKouQ4Bc2AqGsLrJ1-ir55a6gXDq1v7_ZhHsVv4';
const RANGE = 'Sheet1!A2:G';

async function fetchSupporters() {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        const rows = data.values;

        if (rows && rows.length > 0) {
            const grid = document.getElementById('supporters-grid');
            rows.forEach(row => {
                // Skip rows that are empty or have missing required fields
                if (row.length < 7 || row.some(cell => !cell.trim())) {
                    return;
                }

                const [name, role, imageUrl, ExpDate, Month, Year, level] = row;
                const card = document.createElement('div');
                card.className = 'card';
                card.style.setProperty('--card-img', `url('${imageUrl}')`);

                card.innerHTML = `
                    <div class="card-body">
                        <div class="name">
                            ${name}
                        </div>
                        <div class="branch">
                            ${role}
                        </div>
                    </div>
                    <div class="overlay">
                        <div class="exp-date">
                            ${ExpDate}
                        </div>
                        <div class="mny">
                            ${Month} ${Year}
                        </div>
                        <p>
                            Thank you for being one of my star
                        </p>
                    </div>
                    <div class="level">
                        Lv. ${level}
                    </div>
                `;

                grid.appendChild(card);
            });
        }
    } catch (error) {
        console.error('Error fetching supporters:', error);
    }
}

fetchSupporters();
