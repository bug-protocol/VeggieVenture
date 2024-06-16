const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const crypto = require('crypto');

const nodemailer = require('nodemailer')
const app = express();
const port = 5500;
const cors = require('cors');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const jwt = require('jsonwebtoken');

mongoose.connect('mongodb+srv://darkfire5442:darkfire007@cluster0.gbfavu6.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDB")
}).catch(err => {
    console.log("Error connecting to MongoDB");
})

app.listen(port, () => {
    console.log("Server listening on port " + port);
})

const User = require("./models/user");
const Post = require("./models/post");

//end point to register users

app.post("/register", async(req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({message:"User already registered"})
        }
        //create a new user
        const newUser = new User({ name, email, password });

        //generate and store verification token
        newUser.verificationToken = crypto.randomBytes(20).toString("hex");
        await newUser.save();

        //send verification email to the user
        sendVerificationEmail(newUser.email, newUser.verificationToken);

        res.status(200).json({ message: "Registration successful" });

    } catch (err) {
        console.log("error registering the user", err);
        res.status(500).json({ message: "error registering the user" });

    }
})

const sendVerificationEmail = async (email, verificationToken) => {
    //create a nodemailer transporter

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'adi.sh5442@gmail.com',
        pass: 'pcxcllqznwpwfvsy',
      },
    });

    const mailOptions = {
        from: "FarmFare.com",
        to: email,
        subject: "Email Verification",
        text:`please click on the following link to verify your email https://localhost:3000/verify/${verificationToken}`
    }
    try {
        await transporter.sendMail(mailOptions)
    } catch (error) {
        console.log("error sending mail",error)
    }

}

app.get("/verify/:token", async (req, res) => {
    try {
        const token = req.params.token;
        const user = await User.findOne({ verificationToken: token });
        if (!user) {
            return res.status(404).json({ message: "Invalid token" })
        }
        user.verified = true;
        user.verificationToken = undefined;
        await user.save();
        req.status(200).json({ message: "Email verified successfully" })

    } catch (error) {
        console.log("error getting token", error)
        res.status(500).json({ message: "Email verification failed" })
    }
});
const generateSecretKey = () => {
  const secret = crypto.randomBytes(32).toString('hex');
  return secret;
};
const secretKey = generateSecretKey();

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Invalid email" });
        }
        if (user.password !== password) {
            return res.status(404).json({ message: "Invalid password" });
        }

        const token = jwt.sign({ userId: user._id }, secretKey);;
        res.status(200).json({ token });

    } catch (error) {
        res.status(500).json({ message: "Login failed" });
    }
})