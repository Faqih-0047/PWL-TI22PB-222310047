const { Users } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
  try {
    const { username, password, fullname } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await Users.create({ username, password: hashedPassword, fullname });
    res.status(201).json({message: "User Created Succesfully", code: 201, user: {id: newUser.id, username, fullname }});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Users.findOne({ where: { username } });

    if (!user) return res.status(404).json({ error: 'User not found' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid password' });

    const token = jwt.sign(
      { id: user.id, username: user.username, fullname: user.fullname },
      '123456789',
      { expiresIn: '1d' }
    );

    res.status(200).json({
        message: 'Login successful',
        code: 200,
        user: {
            id: user.id,
            username: user.username,
            fullname: user.fullname
        },
        token
        });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: ['id', 'username', 'fullname']
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await Users.findByPk(req.params.id, {
      attributes: ['id', 'username', 'fullname']
    });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, password, fullname } = req.body;

  try {
    const user = await Users.findByPk(id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (password) {
      const bcrypt = require('bcryptjs');
      user.password = await bcrypt.hash(password, 10);
    }

    user.username = username || user.username;
    user.fullname = fullname || user.fullname;

    await user.save();
    res.json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Users.findByPk(id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    await user.destroy();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
