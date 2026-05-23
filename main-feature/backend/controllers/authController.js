const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    const {email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = "INSERT INTO users (email, password) VALUES ( ?, ?)";

        db.query(sql, [email, hashedPassword], (err, result) => {
        if (err) {
            console.log(err);
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ message: "Email sudah terdaftar!" });
            }
            return res.status(500).json({ message: "Register gagal" });
        }

        const token = jwt.sign(
            { id: result.insertId, email},
            process.env.JWT_SECRET, 
            { expiresIn: "1d" }
        );

        res.status(201).json({
            message: "Register berhasil",
            token,
            user: {
                id: result.insertId,
                email,
                is_completed: 0
            },
        });
    });
    } catch (error) {
    res.status(500).json({
        message: error.message
        });
    }
};

const loginUser = (req, res) => {
    const {email, password} = req.body;

    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], async (err, result) => {
        if (err) {
            return res.status(500).json({message: "Server error"});
        }

        if (result.length === 0) {
            return res.status(404).json({ message: "User tidak ditemukan"});
        }

        const user = result[0];

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({message: "Password salah"});
        }

        if (user.is_completed === 0) {

            const token = jwt.sign(
                { id: user.id, email: user.email },
                process.env.JWT_SECRET, 
                { expiresIn: "1d" }
            );

            return res.status(200).json({
                message: "Lengkapi data terlebih dahulu",
                redirectTo: "/input",
                user: {
                    id:user.id,
                    fullname:user.fullname,
                    email:user.email,
                    is_completed: user.is_completed
                }
            });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET, 
            { expiresIn: "1d" }
        );

        res.status(200).json({
            message: "Login berhasil",
            token,
            user: {
                id: user.id,
                fullname:user.fullname,
                email:user.email,
                is_completed: user.is_completed
            },
        });
    });
};

const inputData = (req,res) => {
    const { userId, nama, jeniskelamin, tanggallahir, noTelp} = req.body;

    const sql = `
        UPDATE users 
        SET
            fullname = ?,
            gender = ?,
            birth_date = ?,
            phone = ?,
            is_completed = 1
        WHERE id = ?
    `;

    db.query(
        sql, [nama, jeniskelamin, tanggallahir, noTelp,userId],
        (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Gagal simpan profile",
                });
            }

            db.query("SELECT * FROM users WHERE id = ?", 
                [userId], 
                (err, result) => {

                    if (err) {
                        return res.status(500).json({
                            message: "Gagal mengambil data user",
                        });
                    }

                    const { password, ...userWithoutPassword } = result[0];

                    res.status(200).json({
                        message: "Profile berhasil dilengkapi",
                        user: userWithoutPassword,
                    });
                }
            );
        }
    );
};

const getProfile = (req, res) => {
    const {id} = req.params;

    const sql = "SELECT * FROM users WHERE id = ?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Server error",
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: "User tidak ditemukan",
            });
        }

        const { password, ...userWithoutPassword } = result[0];

        res.status(200).json(userWithoutPassword);
    });
};

const updateProfile = (req,res) => {
    const {id} = req.params;
    const {fullname, gender, email, phone, birth_date} = req.body;

    const sql = `UPDATE users SET fullname=?, gender=?, email=?, phone=?, birth_date=? WHERE id=?`;

    db.query(
        sql, [fullname, gender, email, phone, birth_date, id],
        (err) => {
            if(err) {
                return res.status(500).json({
                    message: "Gagal update profile",
                });
            }

            db.query("SELECT * FROM users WHERE id = ?",
                [id], (err, result) => {
                    if (err) {
                        return registerUser.status(500).json({
                            message: "Gagal mengambil data user",
                        });
                    }

                    const { password, ...userWithoutPassword } = result[0];

                    res.status(200).json({
                        message: "Profile berhasil diupdate",
                        user: result[0],
                    });
                }      
            );
        }
    );
};

const uploadPhoto = (req, res) => {
    const {id} = req.params;

    if (!req.file) {
        return res.status(400).json({
            message: "File tidak ditemukan",
        });
    }

    const imagePath = `/uploads/${req.file.filename}`;

    const sql = `UPDATE users SET profile_image = ? WHERE id = ?`;

    db.query(sql,[imagePath, id], (err) => {
        if(err) {
            return res.status(500).json({
                message: "Gagal upload foto",
            });
        }

        res.status(200).json({
            message: "Upload berhasil", imagePath
        });
    });
};

const changePassword = async (req, res) => {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;

    const sql = "SELECT * FROM users WHERE id = ?";
    db.query(sql, [id], async (err, result) => {
        if (err) return res.status(500).json({ message: "Server error" });
        if (result.length === 0) return res.status(404).json({ message: "User tidak ditemukan" });

        const user = result[0];
        const isMatch = await bcrypt.compare(oldPassword, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Password lama salah" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const updateSql = "UPDATE users SET password = ? WHERE id = ?";
        
        db.query(updateSql, [hashedPassword, id], (err) => {
            if (err) return res.status(500).json({ message: "Gagal update password" });
            res.status(200).json({ message: "Password berhasil diubah" });
        });
    });
};

module.exports = { registerUser, loginUser, inputData, getProfile, uploadPhoto, updateProfile, changePassword };
