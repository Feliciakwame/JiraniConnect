document.addEventListener("DOMContentLoaded", async () => {
  const servicesContainer = document.getElementById("services-container");

  if (!servicesContainer) {
    console.error("Error: Element with ID 'services-container' not found.");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/services");

    if (!response.ok) {
      throw new Error("Failed to fetch services");
    }

    const services = await response.json();

    if (services.length === 0) {
      servicesContainer.innerHTML = "<p>No services available.</p>";
      return;
    }

    services.forEach((service) => {
      const serviceElement = document.createElement("div");
      serviceElement.classList.add("service-card");

      serviceElement.innerHTML = `
              <img src="${service.image}" alt="${service.name}" class="service-image">
              <h2>${service.name}</h2>
              <p><strong>Category:</strong> ${service.category}</p>
              <p><strong>Location:</strong> ${service.location}</p>
              <p><strong>Contact:</strong> <a href="tel:${service.contact}">${service.contact}</a></p>
          `;

      servicesContainer.appendChild(serviceElement);
    });
  } catch (error) {
    console.error("Error:", error);
    servicesContainer.innerHTML = "<p>Error loading services.</p>";
  }
});
