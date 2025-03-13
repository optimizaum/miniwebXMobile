import otpGenerator from 'otp-generator';
import UserAuth from '../models/userAuth.model.js';
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer';

// Function to send OTP via email
function sendMail(email,otp){
    const transporter = nodemailer.createTransport({
        host: 'smtp.hostinger.com',
        port: 587, // Use port 465 for SSL
        secure: false,
        auth: {
            user: 'no-reply@miniwebx.com',
            pass: 'No@#341R'
        }
    });
    console.log(email)
    var mailOptions = {
        from: 'no-reply@miniwebx.com',
        to: email,
        subject: "otp verification",
        body:`otp is ${otp}`
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}
// Signup Controller
export const userSignup = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email ) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const existingUser = await UserAuth.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const otp = otpGenerator.generate(4, { lowerCaseAlphabets : false, specialChars: false,upperCaseAlphabets:false });
        await UserAuth.create({ email, otp}); // OTP valid for 5 minutes

        await sendMail(email, otp);
        res.status(200).json({ message: 'OTP sent to email',otp });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

// OTP Verification Controller


export const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) {
            return res.status(400).json({ error: "Email and OTP are required" });
        }

        // Find the user by email and OTP
        const user = await UserAuth.findOne({ email, otp });
        if (!user) {
            return res.status(400).json({ error: "Invalid or expired OTP" });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });

        // Update user with the new token
        const updatedUser = await UserAuth.findOneAndUpdate(
            { email },
            { $set: { token } },
            { new: true, select: "-otp -password" } // Exclude OTP and password from response
        );

        res.status(200).json({ 
            message: "Login successful", 
            user: updatedUser, 
            token 
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};


// Login Controller
export const userLogin = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        const existingUser = await UserAuth.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ error: 'User not found' });
        }

        const otp = otpGenerator.generate(4, {  lowerCaseAlphabets : false, specialChars: false,upperCaseAlphabets:false });
        await UserAuth.findOneAndUpdate({email},{otp});
        await sendMail(email, otp);
        res.status(200).json({ message: 'OTP sent for login',otp });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};
