const router = require("express").Router();
const User = require("../model/User");
const { registerValidation } = require("../validation");

router.post("/register", async (req, res) => {
    // lets validate the data before we a user
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // checking if the user is already in the database
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send("Email already exists.");

    // create new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    try {
        console.log("register");
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (err) {
        console.log("err: ", err);
        res.status(400).send(err);
    }
});

module.exports = router;
