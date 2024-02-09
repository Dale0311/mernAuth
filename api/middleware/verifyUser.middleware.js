import jwt from 'jsonwebtoken';
const verifyUser = (req, res, next) => {
  // here
  const token = req.cookies.accessToken;
  if (!token) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) return res.sendStatus(401);
    req.user = user;
  });
  next();
};
export default verifyUser;
