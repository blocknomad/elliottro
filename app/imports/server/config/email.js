import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";

Accounts.emailTemplates.siteName = "Elliott Ro";

Accounts.emailTemplates.from = "Elliott Ro <support@elliottro.com>";

Accounts.emailTemplates.verifyEmail.subject = () =>
  "Welcome to Elliott Ro! Please verify your email";

Accounts.emailTemplates.verifyEmail.html = (user, url) =>
  `Hello dear user,

  Please verify your email by clicking the link below:

  ${url}
`;

Accounts.urls.resetPassword = (token) =>
  Meteor.absoluteUrl(`reset-password/${token}`);
