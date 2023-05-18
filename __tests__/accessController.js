const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const accessController = require('../server/controllers/accessController');
const User = require('../server/models/userModel.js');

jest.mock('./User'); // Mocking the User model

describe('accessController.createUser', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {
        username: 'testuser',
        password: 'password123',
      },
    };
    res = {
      locals: {},
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new user and call next', async () => {
    const mockedSalt = 'mockedSalt';
    const mockedHashedPassword = 'mockedHashedPassword';
    const mockedUser = {
      _id: 'mockedUserId',
    };
    const mockedSave = jest.fn(() => mockedUser);
    bcrypt.genSalt = jest.fn().mockResolvedValue(mockedSalt);
    bcrypt.hash = jest.fn().mockResolvedValue(mockedHashedPassword);
    User.create.mockReturnValue({ save: mockedSave });

    await accessController.createUser(req, res, next);

    expect(bcrypt.genSalt).toHaveBeenCalledWith(accessController.saltRounds);
    expect(bcrypt.hash).toHaveBeenCalledWith(req.body.password, mockedSalt);
    expect(User.create).toHaveBeenCalledWith({
      username: req.body.username,
      password: mockedHashedPassword,
    });
    expect(mockedSave).toHaveBeenCalled();
    expect(res.locals.user).toEqual(mockedUser._id);
    expect(next).toHaveBeenCalled();
  });

  it('should handle missing username or password in input field', async () => {
    req.body.username = null;

    await accessController.createUser(req, res, next);

    expect(next).toHaveBeenCalledWith({
      log: 'Missing username or password in input field',
      status: 400,
      message: { err: 'An error occurred' },
    });
  });

  it('should handle error in creating a user inside the db', async () => {
    const mockedError = new Error('Database error');
    User.create.mockRejectedValue(mockedError);

    await accessController.createUser(req, res, next);

    expect(next).toHaveBeenCalledWith({
      log: 'Error occurred in creating a user inside db.',
      status: 500,
      message: { err: 'An error occurred' },
    });
  });
});