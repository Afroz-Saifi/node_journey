const authorization = (roles) => {
  return async (req, res, next) => {
    if (roles.includes(req.user.role)) {
      next();
      return;
    }
    return res.json({
      error: {
        status: "400 Bad request",
        msg: "you are not authorized for this route",
      },
    });
  };
};

module.exports = { authorization };
