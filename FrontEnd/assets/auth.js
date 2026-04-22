const container =document.getElementById('login-container')
const registerBtn = document.getElementById('daftar')
const loginBtn = document.getElementById('masuk');

registerBtn.addEventListener('click', () =>
{
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => 
{
    container.classList.remove("active");
});

const openBtn = document.getElementById("openTerm");
const modal = document.getElementById("termModal");
const closeBtn = document.getElementById("closeTerm");

openBtn.addEventListener("click", () => {
    modal.style.display = "block";
});

closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    const ingatkanSaya = document.getElementById("ingatkanSaya").checked;

    let users =JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
        user => user.email === email && user.password === password        
    );

    if (user) {
        if (ingatkanSaya) {
            localStorage.setItem("currentUser", JSON.stringify(user));
        } else {
            sessionStorage.setItem("currentUser", JSON.stringify(user));
        }

        window.location.href = "http://localhost:5175/";
    } else {
        alert("Email atau password salah"); 
    }
});

const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value.trim();
    const agree = document.getElementById("agree").checked;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (!name || !email || !password) {
        alert("Semua field harus diisi!");
        return;
    }

    if(!agree) {
        alert("Anda harus menyetujui syarat & ketentuan");
        return;
    }

    if (password.length < 8){
        alert("Password minimal 8 karakter");
        return;
    }

    const userExists = users.find(user => user.email === email);

    if(userExists) {
        alert("Email sudah terdaftar");
        return;
    }

    const newUser = {name, email, password};
    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    alert("Berhasil daftar! Silahkan Masuk");

    signupForm.reser();

    container.classList.remove("active");

});