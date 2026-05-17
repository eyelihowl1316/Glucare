const db = require("../config/db");

const submitLabResult = (req, res) => {
    const { 
        user_id, hba1c, gula_darah_puasa, 
        berat_badan, tinggi_badan, riwayat_keluarga, riwayat_diabetes 
    } = req.body;

    if (!user_id) {
        return res.status(400).json({ message: "User ID diperlukan" });
    }

    const sql = `
        INSERT INTO lab_results (
            user_id, hba1c, gula_darah_puasa, 
            berat_badan, tinggi_badan, riwayat_keluarga, riwayat_diabetes
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [
        user_id, hba1c, gula_darah_puasa, 
        berat_badan, tinggi_badan, riwayat_keluarga, riwayat_diabetes
    ], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Gagal menyimpan data lab" });
        }
        res.status(201).json({ message: "Data lab berhasil disimpan", id: result.insertId });
    });
};

const getLabResult = (req, res) => {
    const { user_id } = req.params;

    const sql = "SELECT * FROM lab_results WHERE user_id = ? ORDER BY created_at DESC LIMIT 1";

    db.query(sql, [user_id], (err, results) => {
        if (err) return res.status(500).json({ message: "Gagal mengambil data lab" });
        if (results.length === 0) return res.status(404).json({ message: "Data lab belum ada" });
        
        res.status(200).json(results[0]);
    });
};

module.exports = { submitLabResult, getLabResult };
