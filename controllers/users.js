import User from "../models/user";

export const signUp = async (req, res) => {
  try {
    const { email, first_name, last_name, password } = req.body;

    const password_digest = await bcrypt.hash(password, SALT_ROUNDS);
    const user = new User({ email, first_name, last_name, password_digest });
    await user.save();

    const payload = {
      id: user._id,
      email: user.email,
      exp: parseInt(exp.getTime() / 1000),
    };
    const token = jwt.sign(payload, TOKEN_KEY);

    res.status(201).json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ error: error.message });
  }
};

export const updateUserInfo = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndUpdate(id, req.body, { new: true }, (err, user) => {
      if (err) {
        res.status(500).json(err);
      }
      if (!user) {
        res.status(500).send("User not found!");
      }
      res.status(200).json(user);
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Auth
export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email }).select(
      "email password_digest"
    );
    if (await bcrypt.compare(password, user.password_digest)) {
      const payload = {
        id: user_id,
        email: user.email,
        exp: parseInt(exp.getTime() / 1000),
      };
      const token = jwt.sign(payload, TOKEN_KEY);
      res.status(201).json({ token });
    } else {
      res.status(401).send("Invalid credentials");
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

export const verify = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const payload = jwt.verify(token, TOKEN_KEY);
    if (payload) {
      res.json(payload);
    }
  } catch (error) {
    console.log(error.message);
    res.status(401).send("Not authorized");
  }
};
