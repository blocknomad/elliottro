import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

const Newsletter = new Mongo.Collection("newsletter");

export const NewsletterSchema = new SimpleSchema({
  email: SimpleSchema.RegEx.Email,
  subscribedAt: {
    type: Date,
    optional: true,
    autoValue() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return { $setOnInsert: new Date() };
      }
      this.unset();
    },
  },
});

Newsletter.attachSchema(NewsletterSchema);

export default Newsletter;
