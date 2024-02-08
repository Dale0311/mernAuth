const verifyUser = (req, res, next) => {
    // here
  const token = req.cookies.accessToken;
  console.log(req);
  if (!token) return res.sendStatus(401);
  next();
};
export default verifyUser;
