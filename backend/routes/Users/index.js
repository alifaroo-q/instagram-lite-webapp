
const express = require('express');
const router = express.Router();
const Joi = require('joi');

const db = require('../../database');
router.use(express.json());

db.connect((err) => {
    if (err) throw err;
    console.log(`connected to database on thread ${db.threadId}`);
});

router.get('/', (req, res) => {
    const sql = "select * from user";
    db.query(sql, (error, results) => {
        if (error) res.status(500).json({message: error.sqlMessage});
        res.status(200).json(results);
    });
});

router.get('/:id', (req, res) => {
    const sql = `select * from user where id = ${req.params.id}`;
    db.query(sql, (error, results) => {
        if (error) res.status(500).json({message: error.sqlMessage});
        res.status(200).json(results);
    });
});

router.post('/', (req, res) => {

    const userSchema = Joi.object({
        firstName: Joi.string().required().min(3),
        lastName: Joi.string().required().min(3),
        birthday: Joi.string().required(),
        gender: Joi.string().required().min(1).max(1),
        passwd: Joi.string().required().min(5),
        email: Joi.string().required().email(),
    });

    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthday: req.body.birthday,
        gender: req.body.gender,
        passwd: req.body.passwd,
        email: req.body.email
    };


    const { error } = userSchema.validate(user);

    if (error) {
        res.status(400).json({message: error.message});
    }

    const sql = `insert into User(firstName, lastName, birthday, gender, passwd, email) values(?, ?, ?, ?, ?, ?)`;
    const values = [user.firstName, user.lastName, user.birthday, user.gender, user.passwd, user.email];

    db.query(sql, values, (error, results) => {
        if (error) res.status(500).json({message: error.sqlMessage});
        res.status(201).json({id: results.insertId, ...user});
    });

});

router.delete('/:id', (req, res) => {
    const sql = `delete from User where id = ?`;
    db.query(sql, req.params.id, (error, results) => {
        if (error) res.status(500).json({message: error.sqlMessage});
    });
});

module.exports = router;