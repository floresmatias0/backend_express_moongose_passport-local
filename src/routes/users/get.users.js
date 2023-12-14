const server = require('express').Router();
const { findAllUsers, findUserById } = require('../../controllers/users');

server.get('/:id?',
    async (req, res) => {
        const { id } = req.params

        if(id) {
            try {
                const user = await findUserById(id);
                return res.status(200).json({
                    success: true,
                    data: user
                });
            } catch (err) {
                return res.status(500).json({
                    success: false,
                    error: err.message
                });
            }
        }

        try {
            const users = await findAllUsers();

            return res.status(200).json({
                success: true,
                data: users
            });
        } catch (err) {
            console.log(err.message)
            return res.status(500).json({
                success: false,
                error: err.message
            });
        }
    }
);

module.exports = server;