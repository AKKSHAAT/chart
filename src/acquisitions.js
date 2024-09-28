import Chart from "chart.js/auto";
import getData from "./data";

(async function () {
  const data = await getData();

  const parseMarketSize = (sizeString) => {
    const match = sizeString.match(/[\d.]+/);
    return match ? parseFloat(match[0]) : null;
  };

  // Ensure you map the correct fields (e.g., 'Year' and 'Market Size (Billions USD)')
  const labels = data.map((row) => row["Year"]);
  const marketSize = data
    .map((row) => parseMarketSize(row["Market Size (Billions USD)"])) // Extract the numeric part
    .filter((size) => size !== null); // Filter out any null (non-numeric) values

  new Chart(document.getElementById("acquisitions"), {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: "Market Size (Billions USD)",
          data: marketSize, // Use the parsed market size data
        },
      ],
    },
  });
})();
