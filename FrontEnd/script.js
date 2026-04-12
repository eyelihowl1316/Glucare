// ================= FAQ =================

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
    const button = item.querySelector(".faq-question");

    button.addEventListener("click", () => {

        // Tutup yg lain
        faqItems.forEach((otherItem) => {
            if (otherItem !== item) {
                otherItem.classList.remove("active");
            }
        });

        // Toggle item yang diklik (buka/tutup)
        item.classList.toggle("active");
    });
});


// ================= FOOTER INCLUDE =================

fetch("footer.html")
    .then((response) => {
        if (!response.ok) {
            throw new Error("Failed to load footer");
        }
        return response.text();
    })
    .then((data) => {
        document.getElementById("footer").innerHTML = data;
    })
    .catch((error) => console.error(error));