fetch("/FrontEnd/components/footer.html")
    .then((response) => {
        if (!response.ok) {
            throw new Error("Footer gagal dimuat");
        }
        return response.text();
    })
    .then((data) => {
        document.getElementById("footer").innerHTML = data;
    })
    .catch((error) => console.error(error));


fetch("/FrontEnd/components/navbar.html")
    .then(response => {
        if (!response.ok) {
            throw new Error("Navbar gagal dimuat");
        }
        return response.text();
    })
    .then(data => {
        document.getElementById("navbar").innerHTML = data;

        const links = document.querySelectorAll(".links a, .login");
        const currentPage = window.location.pathname;

        links.forEach(link => {
            if (link.getAttribute("href") === currentPage) {
                link.classList.add("active");
            }
        });
    })
    .catch(error => console.error(error));


