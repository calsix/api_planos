const jwtUtils = require('../helpers/jwtUtils');
const db = require('../models/db');

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const users = await db.query('SELECT * FROM scc0032 WHERE st_usuario = ?', [username]);

        const user = users[0];

        if (!user) {
            return res.status(401).send('Invalid credentials');
        }

        const passwordInt = parseInt(password);

        if (passwordInt !== user.IN_TOKEN) {
            return res.status(401).send('Invalid credentials');
        } else {
            const token = jwtUtils.generateToken(user);
            res.json({ token });
        }

    } catch (err) {
        res.status(401).send('Invalid credentials');
    }
};
