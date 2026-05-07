export function required(req, res, next) {
  const UserId = req.session.UserId;
  if (!UserId) {
    console.log("Access blocked:no userId is found ");
    return res.status(401).json({ error: `Unauthorized` });
  } else {
    next();
  }
}
