//import { Meteor } from 'meteor/meteor'

//const { username, password, server, port } = Meteor.settings.smtp
const username = "elliottro.smtp@gmail.com";
const password = "elliottrosmtp";
const server = "smtp.gmail.com";
const port = 587;

process.env.MAIL_URL = `smtp://${username}:${password}@${server}:${port}`;
