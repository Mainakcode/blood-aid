// Donor Registration
const donorForm = document.getElementById("donorForm");
donorForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const donorData = {
    name: document.getElementById("name").value,
    city: document.getElementById("regCity").value.toLowerCase(),
    state: document.getElementById("state").value,
    phone: document.getElementById("phone").value,
    blood: document.getElementById("regBlood").value,
  };

  const newDonorKey = firebase.database().ref().child("donors").push().key;
  firebase.database().ref("donors/" + newDonorKey).set(donorData);

  alert("Donor registered successfully!");
  donorForm.reset();
});

// Donor Search
function searchDonors() {
  const bloodGroup = document.getElementById("bloodGroup").value;
  const city = document.getElementById("city").value.toLowerCase();
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = ""; // Clear previous results

  firebase.database().ref("donors").once("value", (snapshot) => {
    const donors = snapshot.val();
    let found = false;

    for (let key in donors) {
      const donor = donors[key];

      // Matching logic: match both city and blood group
      if (donor.city === city && donor.blood === bloodGroup) {
        found = true;

        // Create and append each donor card
        const card = document.createElement("div");
        card.className = "donor-card";
        card.innerHTML = `
          <h3>${donor.name}</h3>
          <p><strong>City:</strong> ${donor.city}</p>
          <p><strong>State:</strong> ${donor.state}</p>
          <p><strong>Phone:</strong> <a href="tel:${donor.phone}">${donor.phone}</a></p>
          <p><strong>Blood Group:</strong> ${donor.blood}</p>
        `;
        resultsDiv.appendChild(card);
      }
    }

    if (!found) {
      resultsDiv.innerHTML = "<p>No donors found. Try a different city or blood group.</p>";
    }
  });
}
