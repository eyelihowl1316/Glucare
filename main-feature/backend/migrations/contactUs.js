require("dotenv").config({ path: __dirname + "/../.env" });
const mysql = require("mysql2");

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) {
        console.error("Gagal terhubung ke database:", err);
        return process.exit(1);
    }
    console.log("Database connected untuk migration...");

    // Tabel Contact Us (Sesuai Frontend)
    const createQuestionnairesTable = `
        CREATE TABLE IF NOT EXISTS contact_us (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) NOT NULL,
            message TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;

    db.query("DROP TABLE IF EXISTS contact_us", () => {
        db.query(createQuestionnairesTable, (err) => {
            if (err) {
                console.error("Gagal membuat tabel contact us:", err);
            } else {
                console.log("Tabel 'contact us' berhasil dibuat sesuai frontend.");
                }
                    
                db.end(() => {
                    console.log("Migration (Rebuild) selesai.");
                    process.exit(0);
            });
        });
    });
});
