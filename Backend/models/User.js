// models/User.js

import mongoose from 'mongoose';

const COLLECTION_NAME = 'data';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  data: {
    type: [{
      type: { type: String }, // type of data, e.g. 'address', 'phone', etc.
      value: mongoose.Schema.Types.Mixed, // value can be of any type
    }],
    default: [], // Default value if not provided
  },
}, { collection: COLLECTION_NAME });

const User = mongoose.model('User', userSchema);

export default User;
