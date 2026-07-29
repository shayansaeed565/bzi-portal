// script.js - Interactivity & Dummy Search Logic for GitHub Pages

document.addEventListener('DOMContentLoaded', () => {
    
    const flightSearchBtn = document.getElementById('search-flights-btn');
    const resultsContainer = document.getElementById('flight-results');

    if(flightSearchBtn) {
        flightSearchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Get values from inputs
            const origin = document.getElementById('input-origin').value.trim();
            const destination = document.getElementById('input-destination').value.trim();
            const date = document.getElementById('input-date').value;

            if(!origin || !destination || !date) {
                alert("Logic sahi karo: Please fill From, To, and Date fields before searching.");
                return;
            }

            // Show loading state
            flightSearchBtn.innerHTML = 'Searching Database...';
            flightSearchBtn.disabled = true;
            resultsContainer.innerHTML = '';

            // Simulating an API Call delay (Dummy Logic for Static Hosted Site)
            setTimeout(() => {
                flightSearchBtn.innerHTML = 'Search Flights';
                flightSearchBtn.disabled = false;

                // Mock Data Presentation
                const mockFlights = [
                    { airline: "Emirates", flightNo: "EK-605", price: "PKR 125,000", status: "Seats Available" },
                    { airline: "FlyDubai", flightNo: "FZ-328", price: "PKR 98,500", status: "Few Seats Left" }
                ];

                displayFlightResults(mockFlights, origin, destination);
            }, 1500); // 1.5 seconds delay to mimic real server search
        });
    }

    function displayFlightResults(flights, from, to) {
        if(!resultsContainer) return;
        
        resultsContainer.innerHTML = `<h3 class="font-bold text-gray-700 mb-2">Available flights from ${from.toUpperCase()} to ${to.toUpperCase()}:</h3>`;
        
        flights.forEach(flight => {
            const flightCard = document.createElement('div');
            flightCard.className = 'mt-3 p-4 border rounded-lg bg-gray-50 border-gray-200 flex justify-between items-center transition hover:shadow-md';
            
            flightCard.innerHTML = `
                <div>
                    <h4 class="font-bold text-blue-900 text-lg">${flight.airline} <span class="text-sm font-normal text-gray-500">(${flight.flightNo})</span></h4>
                    <p class="text-sm text-green-600 font-semibold">${flight.status}</p>
                </div>
                <div class="text-right">
                    <span class="text-xl font-bold text-gray-900">${flight.price}</span>
                    <button class="block mt-2 text-xs font-bold uppercase tracking-wide bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded transition w-full">Request Booking</button>
                </div>
            `;
            resultsContainer.appendChild(flightCard);
        });
    }
});