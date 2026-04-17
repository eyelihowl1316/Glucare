const form = document.getElementById("contactForm");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = form.name.value;
    const email = form.email.value;
    const message = form.message.value;

    
    if (!name || !email || !message) {
        showPopup("Gagal!", "Mohon isi semua field!");
        return;
    }

    
    showPopup("Berhasil!", "Pesan Anda telah terkirim! Kami akan segera menghubungi Anda.");
    form.reset();
})


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

