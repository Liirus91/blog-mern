export const create = async (req, res) => {
  try {
  } catch (error) {
    console.error('Post creation error: ', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
