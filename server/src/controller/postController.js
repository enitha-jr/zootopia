const db = require("../utils/connectdb");
const path = require('path');
const fs = require('fs');

class postController {

    getPosts = async (req, res) => {
        try {
            const { slug } = req.params;
            const query1 = "select cid,category_name from categories where slug = ?";
            const [categoryRows] = await db.query(query1, [slug]);
            if (categoryRows.length === 0) {
                return res.status(404).json({ message: 'No such category' });
            }
            const category = categoryRows[0];

            const query2 = "select p.* ,u.username from posts p join users u on p.user_id = u.user_id where p.cid = ?";
            const [posts] = await db.query(query2, [category.cid]);

            res.json({ category, posts });

        } catch (error) {
            console.error('Ercategoryror:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    createPost = async (req, res) => {
        try {
            const cid = parseInt(req.body.cid);    // backend will always receive strings from FormData so cid must be parsed to an integer
            const { title, description, age ,location, userId } = req.body;
            const ext = path.extname(req.file.originalname);

            const imagepath = `/posts/${req.tempFilename}`; // multer stores the new filename in req.file.newFilename

            // console.log('Inserting post:', { cid, title, description, age, imagepath });
            const sql = "insert into posts (post_title, post_description, age, location, post_path, cid , user_id) values (?, ?, ?, ?, ? , ?, ?)";
            const [result] = await db.query(sql, [title, description, age, location,imagepath, cid, userId]);

            const postId = result.insertId;
            const newFilename = `post${postId}${ext}`;
            const newPath = `/posts/${newFilename}`;

            const oldFile = path.join(__dirname, '../../public/posts', req.tempFilename);
            const newFile = path.join(__dirname, '../../public/posts', newFilename);
            fs.renameSync(oldFile, newFile);

            await db.query("UPDATE posts SET post_path = ? WHERE pid = ?", [newPath, postId]);
            console.log('Post created successfully');
            res.status(201).json({ message: 'Post created successfully' });
        }
        catch (error) {
            console.error('Error creating post:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    getUserPosts = async (req, res) => {
        try {
            const userId = req.params.userId;
            const query = "select p.*, c.category_name from posts p join categories c on p.cid = c.cid where p.user_id = ?";
            const [posts] = await db.query(query, [userId]);
            if (posts.length === 0) {
                res.json({ message: 'No posts found for this user' });
            }
            // console.log("posts", posts);
            res.json({ posts });
        } catch (error) {
            console.error('Error fetching user posts:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = new postController();
