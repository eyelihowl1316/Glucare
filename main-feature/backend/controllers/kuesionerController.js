const db = require("../config/db");

const submitKuesioner = (req, res) => {
    const { 
        user_id, usia, riwayat_keluarga, olahraga, 
        makanan_manis, lingkar_pinggang, gejala_diabetes, 
        jam_tidur, tingkat_stress 
    } = req.body;

    if (!user_id) {
        return res.status(400).json({ message: "User ID diperlukan" });
    }

    const sql = `
        INSERT INTO questionnaires (
            user_id, usia, riwayat_keluarga, olahraga, 
            makanan_manis, lingkar_pinggang, gejala_diabetes, 
            jam_tidur, tingkat_stress
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [
        user_id, usia, riwayat_keluarga, olahraga, 
        makanan_manis, lingkar_pinggang, gejala_diabetes, 
        jam_tidur, tingkat_stress
    ], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Gagal menyimpan data kuesioner" });
        }
        res.status(201).json({ message: "Data kuesioner berhasil disimpan", id: result.insertId });
    });
};

const getKuesioner = (req, res) => {
    const { user_id } = req.params;

    const sql = "SELECT * FROM questionnaires WHERE user_id = ? ORDER BY created_at DESC LIMIT 1";

    db.query(sql, [user_id], (err, results) => {
        if (err) return res.status(500).json({ message: "Gagal mengambil data kuesioner" });
        if (results.length === 0) return res.status(404).json({ message: "Data kuesioner belum ada" });
        
        res.status(200).json(results[0]);
    });
};

module.exports = { submitKuesioner, getKuesioner };
