const { messegers, Users } = require('../models');
const { Op } = require('sequelize');

exports.sendMessage = async (req, res) => {
  const { to_user_id, messeges } = req.body;
  const from_id = req.user.id; 

  if (!to_user_id || !messeges) {
    return res.status(400).json({ error: 'to_user_id and messeges are required' });
  }

  try {
    const receiver = await Users.findByPk(to_user_id);
    if (!receiver) {
      return res.status(404).json({ error: 'Receiver not found' });
    }

    const message = await messegers.create({
      from_id,
      to_user_id,
      messeges,
      submited_at: new Date()
    });

    res.status(201).json({message: "Message Send Succesfully", code: 201, data:{message} });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getMessagesBetweenUsers = async (req, res) => {
  const { user1_id, user2_id } = req.params;
  try {
    const messages = await messegers.findAll({
      where: {
        [Op.or]: [
          { from_id: user1_id, to_user_id: user2_id },
          { from_id: user2_id, to_user_id: user1_id },
        ],
      },
      order: [['createdAt', 'ASC']],
    });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.updateMessage = async (req, res) => {
  const { id } = req.params;
  const { messeges } = req.body;
  const userId = req.user.id;

  try {
    const message = await messegers.findByPk(id);
    if (!message) return res.status(404).json({ error: 'Message not found' });

    if (message.from_id !== userId) {
      return res.status(403).json({ error: 'Unauthorized to update this message' });
    }

    message.messeges = messeges || message.messeges;
    await message.save();

    res.json({ message: 'Message updated successfully', data: message });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteMessage = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const message = await messegers.findByPk(id);
    if (!message) return res.status(404).json({ error: 'Message not found' });

    if (message.from_id !== userId) {
      return res.status(403).json({ error: 'Unauthorized to delete this message' });
    }

    await message.destroy();
    res.json({ message: 'Message deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
