import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  vipLevel: {
    type: Number,
    default: 0,
  },
  points: {
    type: Number,
    default: 0,
  },
  balance: {
    type: Number,
    default: 0,
  },
  dailyAdViews: {
    type: Number,
    default: 0,
  },
  lastAdViewReset: {
    type: Date,
    default: Date.now,
  },
  achievements: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Achievement',
  }],
  gameHistory: [{
    game: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Game',
    },
    lastPlayed: Date,
    highScore: Number,
  }],
}, {
  timestamps: true,
});

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('User', userSchema);