const db = require("../config/db");
const axios = require("axios");

const submitKuesioner = async (req, res) => {
    try{
        const { 
            user_id,age_band,gender,bmi_category,waist_category,hypertension,overweight_history,
        } = req.body;

        if (!user_id || age_band === undefined ||
            gender === undefined ||
            bmi_category === undefined ||
            waist_category === undefined ||
            hypertension === undefined ||
            overweight_history === undefined
        ) {
            return res.status(400).json({ message: "Semua field wajib diisi" });
        }

        const payload = {
            age_band: parseInt(age_band),
            gender:parseInt(gender),
            bmi_category:parseInt(bmi_category),
            waist_category:parseInt(waist_category),
            hypertension:parseInt(hypertension),
            overweight_history:parseInt(overweight_history),
        };

        console.log("Payload Questionnaire AI:", payload);

        const aiResponse = await axios.post(
            "https://itzvynn-glucare-backend.hf.space/predict/questionnaire",
            payload,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        const aiResult = aiResponse.data;

        console.log("Response Questionnaire AI:", aiResult);

        let cta = "";

        switch (aiResult.risk_level?.toLowerCase()) {
            case "low":
                cta = "Pertahankan pola hidup sehat dan lakukan evaluasi secara berkala.";
                break;
            case "medium":
                cta = "Disarankan melakukan pemeriksaan laboratorium untuk analisis lebih lanjut";
                break;

            default:
                cta = "Lakukan pemantauan kesehatan secara berkala";
        }

        const sql = `
            INSERT INTO questionnaire_assessments (
                user_id, age_band, gender, bmi_category, waist_category, hypertension,
                overweight_history, risk_level, cta
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            user_id, age_band, gender, bmi_category, waist_category,hypertension,
            overweight_history, aiResult.risk_level, cta, 
        ];

        console.log("Values:", values);

        db.query(sql, values, (err, result) => {
            if (err) {
                console.error("Database Error:", err);

                return res.status(500).json({
                    message: "Gagal menyimpan hasil kuesioner",
                });
            }

            return res.status(201).json({
                assessment_id: result.insertId,
                risk_level: aiResult.risk_level,
                cta: cta,
                mode: "questionnaire",
            });           
        });
    }catch (error) {
        console.error(
            "Questionnaire AI Error:",
            JSON.stringify(
                error.response?.data, null, 2)
        );

        return res.status(500).json({
            message: "Gagal melakukan prediksi AI",
            error: error.response?.data,
        });
    }
};

const getKuesioner = (req, res) => {
    const { user_id } = req.params;

    const sql = "SELECT * FROM questionnaire_assessments WHERE user_id = ? ORDER BY created_at DESC LIMIT 1";

    db.query(sql, [user_id], (err, results) => {
        if (err) return res.status(500).json({ message: "Gagal mengambil data kuesioner" });
        if (results.length === 0) return res.status(404).json({ message: "Data kuesioner belum ada" });
        
        res.status(200).json(results[0]);
    });
};

module.exports = { submitKuesioner, getKuesioner };
