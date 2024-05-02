const crypto = require("crypto");
const Encrypter = require("../utils/encrypter");
const postgresql_database = require('../services/postgresql_database');

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const encrypter = new Encrypter("secret");

const authenticationController = {
    signup: async (req, res) => {
        // var id = "3";
        // var username = "new_username_3";
        // var password = encrypter.encrypt("new_password");
        // var query = "CALL signup($1, $2, $3);";
        // var value = [id, username, password];

        // try {
        //     var result = await postgresql_database.pool.query(query, value);
        //     return res.status(200).json({ Result: result });
        // } catch (error) {
        //     return res.status(500).json({ Error: error });
        // }
        try {
            const accounts = [
                {
                    username: req.body.username,
                    password: encrypter.encrypt(req.body.password),
                }
            ];

            for (const account of accounts) {
                await prisma.accounts.create({
                    data: account,
                });
            }

            return res.status(200).json({ Result: "Successfull!" });
        } catch (error) {
            return res.status(500).json({ Error: error });
        }

    },
    login: async (req, res) => {
        try {
            const username = req.body.username;
            const password = req.body.password;
            const account = await prisma.accounts.findFirst({
                where: {
                    username: username,
                }
            });
            if (account == null) {
                return res.status(400).json({ Result: "Login Failed!" });
            } else {
                if (encrypter.decrypt(account.password) == password) {
                    return res.status(200).json({ Result: "Login Successfull!" });
                } else {
                    return res.status(400).json({ Result: "Login Failed!" });
                }
            }
        } catch (error) {
            return res.status(500).json({ Error: error });
        }
    },
    refreshToken: async (req, res) => {
        try {
            //
        } catch (error) {
            return res.status(500).json({ Error: error });
        }
    },
    encrypt: async (req, res) => {
        try {
            const clearText = req.body.clearText;
            const encryptedText = encrypter.encrypt(clearText);
            res.status(200);
            return res.json({ EncryptedText: encryptedText });
        } catch (error) {
            res.status(500);
            return res.json({ Error: error });
        }
    },
    decrypt: async (req, res) => {
        try {
            const encryptedText = req.body.encryptedText;
            const clearText = encrypter.decrypt(encryptedText);
            res.status(200);
            return res.json({ ClearText: clearText });
        } catch (error) {
            res.status(500);
            return res.json({ Error: error });
        }
    },
};

module.exports = authenticationController;