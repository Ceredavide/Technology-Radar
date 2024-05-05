const jwt = require('jsonwebtoken');
const User = require('../../../models/User');
const checkAuth = require('../../../middlewares/checkAuth');
const HttpError = require("../../../classes/HttpError");

jest.mock('jsonwebtoken', () => ({
  verify: jest.fn()
}));
jest.mock('../../../models/User', () => ({
  findById: jest.fn()
}));

const getMockReqResNext = () => {
  const req = {
    headers: {
      authorization: 'Bearer token123'
    },
    userData: null
  };
  const res = {};
  const next = jest.fn();
  return { req, res, next };
};

describe('HTTP Middleware checkAuth Tests', () => {
  it('should throw an error if no authorization header is provided', async () => {
    const { req, res, next } = getMockReqResNext();
    req.headers = {};

    await checkAuth(req, res, next);

    expect(next).toBeCalledWith(expect.any(HttpError));
  });

  it('should throw an error if token is not valid', async () => {
    const { req, res, next } = getMockReqResNext();
    req.headers.authorization = 'Bearer ';

    await checkAuth(req, res, next);

    expect(next).toBeCalledWith(expect.any(HttpError));
  });

  it('should throw an error if user is not found', async () => {
    jwt.verify.mockImplementation(() => ({ id: '123' }));
    User.findById.mockResolvedValue(null);

    const { req, res, next } = getMockReqResNext();

    await checkAuth(req, res, next);

    expect(next).toBeCalledWith(expect.any(HttpError));
  });

  it('should populate req.userData and call next if user is found', async () => {
    const mockUser = { id: '123', name: 'Test User' };
    jwt.verify.mockImplementation(() => ({ id: '123' }));
    User.findById.mockResolvedValue(mockUser);

    const { req, res, next } = getMockReqResNext();

    await checkAuth(req, res, next);

    expect(req.userData).toEqual(mockUser);
    expect(next).toBeCalledWith();
  });
});
