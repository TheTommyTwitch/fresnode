var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

//===========================================
//Schema for new user========================
var UserSchema = new Schema({
  email: String,
  password: String,
  books: Array
});

UserSchema.virtual('date')
  .get(function() {
    return this._id.getTimestamp();
  });
