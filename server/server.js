require("dotenv").config();

const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/register", async (req, res) => {
  const { fullName, email, phone } = req.body;
  console.log("🟢 New request received:", req.body);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL, // ✅ your email
      pass: process.env.EMAIL_PASS, // ✅ Gmail App Password (not your real password)
    },
  });

  const mailOptions = {
    from: "olacandid@gmail.com",
    to: "olacandid@gmail.com", // ✅ where to receive registrations
    subject: "New Registration",
    html: `
      <h3>New Student Registration</h3>
      <p><strong>Full Name:</strong> ${fullName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
    
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ message: "Error sending email" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
