const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  name: { type: String },
  username: { type: String },
  email: { type: String },
  password: { type: String },
  role: { type: String, enum : ['ADMIN','SUPER'], default: 'ADMIN' },
}, {
    timestamps: true
});

module.exports = model('User', UserSchema);