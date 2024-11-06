const express = require('express');
const nodemailer = require('nodemailer');
const twilio = require('twilio');
const OneSignal = require('onesignal-node');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// For Email sending 
app.post('/api/send-email', async (req, res) => {
    const { to, subject, text } = req.body;
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'muriithialvin06@gmail.com',
            pass: 'Alvinmuriithi!9438' 
        }
    });

    try {
        await transporter.sendMail({ to, subject, text });
        res.status(200).send('Email sent successfully');
    } catch (error) {
        res.status(500).send('Error sending email: ' + error.message);
    }
});

// For SMS sending 
app.post('/api/send-sms', (req, res) => {
    const { to, message } = req.body;
    const client = twilio('AC274b078c929ca24feef2c24f663256f0', 'cb90334979a45d62c8bfdcce6c2ccd4c');

    client.messages.create({ body: message, to, from: '+12198984607' }) 
        .then(() => res.status(200).send('SMS sent successfully'))
        .catch(error => res.status(500).send('Error sending SMS: ' + error.message));
});

// Push notification logic
app.post('/api/send-push-notification', (req, res) => {
    const { userId, message } = req.body;
    const client = new OneSignal.Client('ca710384-9de8-4ed0-9716-eee660f3817c', 'ZGJlMTEyOWQtODMxNC00YWE2LWEwNTctNzI4MWZkNWY1N2Ix'); 

    const notification = {
        contents: { 'en': message },
        include_player_ids: [userId]
    };

    client.createNotification(notification)
        .then(() => res.status(200).send('Push notification sent successfully'))
        .catch(error => res.status(500).send('Error sending push notification: ' + error.message));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));