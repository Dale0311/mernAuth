const handleReq = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.sendStatus(400);
  res.status(200).json({ message: 'received' });
};

export default handleReq;
