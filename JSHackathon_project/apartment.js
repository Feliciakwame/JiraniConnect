document.addEventListener("DOMContentLoaded", async () => {
  const apartmentsContainer = document.getElementById("apartment-container");

  if (!apartmentsContainer) {
    console.error("Error: Element with ID 'apartments-container' not found.");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/apartments");

    if (!response.ok) {
      throw new Error("Failed to fetch apartments");
    }

    const apartments = await response.json();

    if (apartments.length === 0) {
      apartmentsContainer.innerHTML = "<p>No apartments available.</p>";
      return;
    }

    apartments.forEach((apartment) => {
      const apartmentElement = document.createElement("div");
      apartmentElement.classList.add("apartment-card");

      apartmentElement.innerHTML = `
                <img src="${apartment.image}" alt="${
        apartment.name
      }" class="apartment-image">
                <h2>${apartment.name}</h2>
                <p><strong>Location:</strong> ${apartment.location}</p>
                <p><strong>Price:</strong> KSh ${Number(
                  apartment.price
                ).toLocaleString()}</p>
            `;

      apartmentsContainer.appendChild(apartmentElement);
    });
  } catch (error) {
    console.error("Error:", error);
    apartmentsContainer.innerHTML = "<p>Error loading apartments.</p>";
  }
});
