const jwt = require("jsonwebtoken");
const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.json({ msg: "Please provide correct credentials" });
  }
  const id = new Date().getDate();
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.status(200).json({ msg: 'user created', token })
};

const register = async (req, res) => {};
