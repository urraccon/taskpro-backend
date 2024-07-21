import { Schema, model } from 'mongoose';
import { compare, genSalt, hash } from 'bcrypt';
import { handleError } from '../middlewares/index.js';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for user'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Set password for user'],
    },
    token: {
      type: String,
    },
    theme: {
      type: String,
      enum: ['dark', 'light', 'violet'],
      default: 'dark',
    },
    avatar: {
      type: String,
      default: 'default.jpg',
    },
    activeBoard: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await genSalt(10);

  this.password = await hash(this.password, salt);

  next();
});

userSchema.post('save', handleError);

userSchema.methods.checkPassword = (candidate, passwordHash) => compare(candidate, passwordHash);

export default model('user', userSchema);
