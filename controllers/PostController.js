import PostModel from '../models/Post.js';

export const getAll = async (_req, res) => {
  try {
    const posts = await PostModel.find().populate('user').exec();
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts: ', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getOne = async (_req, res) => {
  try {
    const { id } = _req.params;
    PostModel.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: 'after',
      },
      (err, doc) => {
        if (err) {
          console.error('Error updating views count: ', err);
          return res.status(500).json({ message: 'Internal server error' });
        }

        if (!doc) {
          return res.status(404).json({ message: 'Post not found' });
        }

        res.json(doc);
      }
    );
  } catch (error) {
    console.error('Error fetching posts: ', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

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
