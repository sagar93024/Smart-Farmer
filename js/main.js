const API_URL = "http://localhost:3000";

// Crop Suggestion
function recommendCrop() {
  const soil = document.getElementById('soil').value;
  const moisture = parseInt(document.getElementById('moisture').value);
  const temp = parseInt(document.getElementById('temperature').value);
  let recommendation = "";

  if (soil === "loamy" && temp > 10 && moisture > 40 && moisture < 50) {
    recommendation = "Recommended Crops: Wheat, Sugarcane, Cotton, Jute, Pulses, Oilseeds";
  } else if (soil === "sandy" && temp > 15 && temp < 25) {
    recommendation = "Recommended Crops: Bajra, Mustard, Cumin, Moong, Moth, Jowar";
  } else if (soil === "clay" && moisture > 45 && moisture < 60) {
    recommendation = "Recommended Crops: Rice, Wheat, Sugarcane, Cotton";
  } else if (soil === "gad" && moisture > 20 && moisture < 30) {
    recommendation = "Recommended Crops: Cereals, Pulses, Oilseeds, Vegetables";
  } else {
    recommendation = "No specific suggestion. Please check inputs.";
  }

  document.getElementById('cropOutput').innerHTML = recommendation;
}

// Weather
async function getWeather() {
  try {
    const res = await fetch(`${API_URL}/weather`);
    const data = await res.json();
    document.getElementById('weatherOutput').innerHTML = `
      <p><strong>Temperature:</strong> ${data.temperature} °C</p>
      <p><strong>Humidity:</strong> ${data.humidity} %</p>
      <p><strong>Condition:</strong> ${data.condition}</p>
    `;
  } catch (err) {
    document.getElementById('weatherOutput').innerText = "Failed to fetch weather data.";
  }
}

// Mandi Rates
async function loadMandi() {
  try {
    const res = await fetch(`${API_URL}/mandi`);
    const data = await res.json();
    let html = `<table>
      <tr><th>Date</th><th>District</th><th>Market</th><th>Commodity</th><th>Min Price</th><th>Max Price</th><th>Modal Price</th></tr>`;
    data.forEach(row => {
      html += `<tr>
        <td>${row.date}</td>
        <td>${row.district}</td>
        <td>${row.market}</td>
        <td>${row.commodity}</td>
        <td>${row.min_price}</td>
        <td>${row.max_price}</td>
        <td>${row.modal_price}</td>
      </tr>`;
    });
    html += `</table>`;
    document.getElementById('mandiOutput').innerHTML = html;
  } catch (err) {
    document.getElementById('mandiOutput').innerText = "Failed to load Mandi data.";
  }
}

document.addEventListener('DOMContentLoaded', () => {
  getWeather();
  loadMandi();
});
