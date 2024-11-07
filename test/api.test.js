const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app'); // Adjust the path if necessary
const should = chai.should();

chai.use(chaiHttp);

describe('Messaging API', () => {
    // Test for sending an email
    it('should send an email', (done) => {
        chai.request(server)
            .post('/api/send-email')
            .send({
                to: 'muriithialvin06@gmail.com',
                subject: 'Test Email',
                text: 'Hello, this is a test email!'
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.text.should.equal('Email sent successfully');
                done();
            });
    });

    // Test for sending an SMS
    it('should send an SMS', (done) => {
        chai.request(server)
            .post('/api/send-sms')
            .send({
                to: '+254715089915',
                message: 'Hello, this is a test SMS!'
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.text.should.equal('SMS sent successfully');
                done();
            });
    });

    // Test for sending a push notification
    it('should send a push notification', (done) => {
        chai.request(server)
            .post('/api/send-push-notification')
            .send({
                userId: 'ca710384-9de8-4ed0-9716-eee660f3817c',
                message: 'Hello, this is a test push notification!'
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.text.should.equal('Push notification sent successfully');
                done();
            });
    });
});