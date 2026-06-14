const express = require("express");
const router = express.Router();
const { predictClinical, predictQuestionnaire } = require("../controllers/aiController");

// POST /api/ai/predict/clinical — Prediksi mode klinis/lab
router.post("/predict/clinical", predictClinical);

// POST /api/ai/predict/questionnaire — Prediksi mode kuesioner
router.post("/predict/questionnaire", predictQuestionnaire);

module.exports = router;
