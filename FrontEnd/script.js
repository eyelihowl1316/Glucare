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

// ================= HUBUNGI KAMI =================

const form = document.getElementById("contactForm");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = form.name.value;
    const email = form.email.value;
    const message = form.message.value;

    //VALIDASI
    if (!name || !email || !message) {
        showPopup("Gagal!", "Mohon isi semua field!");
        return;
    }

    //SUSKES
    showPopup("Berhasil!", "Pesan Anda telah terkirim! Kami akan segera menghubungi Anda.");
    form.reset();
})

// ================= POPUP NOTIFICATION =================
function showPopup(title, message) {
    const popup = document.getElementById("popup");
    const popupTitle = document.getElementById("popupTittle");
    const popupMessage = document.getElementById("popupMessage");

    popupTitle.textContent = title;
    popupMessage.textContent = message;
    popup.style.display = "flex";
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}