const mongoose = require('mongoose');
const User = require('../../../models/User');

describe('User Model Integration Test', () => {
  it('should create and save a user successfully', async () => {
    const userData = {
      email: 'test@example.com',
      password: 'Password123',
    };
    const user = new User(userData);
    const savedUser = await user.save();
    expect(savedUser._id).toBeDefined();
    expect(savedUser.email).toBe(userData.email);
    expect(savedUser.userName).toBe(userData.email.split('@')[0]);
  });

  it('should enforce unique email addresses', async () => {
    const userData = {
      email: 'unique@example.com',
      password: 'Password123',
    };

    await new User(userData).save();

    const duplicateUser = new User(userData);
    await expect(duplicateUser.save()).rejects.toThrow(mongoose.Error.ValidationError);
  });

  it('should automatically generate a username from the email', async () => {
    const userData = {
      email: 'username@example.com',
      password: 'Password123',
    };
    const user = new User(userData);
    await user.save();
    expect(user.userName).toBe('username');
  });
});
