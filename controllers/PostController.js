import PostModel from '../models/Post.js';

export const create = async (req, res) => {
  try {
    const { title, text, tags, imageUrl } = req.body;

    const doc = new PostModel({
      title,
      text,
      tags,
      user: req.userId,
      imageUrl,
    });

    const post = await doc.save();

    res.status(201).json(post);
  } catch (error) {
    console.error('Post creation error: ', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
