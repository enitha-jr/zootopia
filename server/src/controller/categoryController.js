const db = require("../utils/connectdb");

class categoryController {
    getCategories = async (req, res) => {
        try {
            const sql = "select * from categories";
            const [rows] = await db.query(sql);
            if (rows.length === 0) {
                return res.status(404).json({ message: 'No categories found' });
            }
            res.json(rows);
        } catch (error) {
            console.error('Error fetching categories:', error);
            res.status(500).json({ error: "Unable to fetch categories", message: error.message });
        }
    }
}

module.exports = new categoryController();
