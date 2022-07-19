const Data = require('../models/Data');

module.exports = {
  getAllData: async (req, res) => {
    try {
      // mendapatkan semua data dari database
      const data = await Data.find();

      res.status(200).json({
        data,
      });
    } catch (err) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
};
