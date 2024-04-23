const HttpError = require('../../../classes/HttpError');
const checkRole = require('../../../middlewares/checkRole');

const getMockReqResNext = user => {
  const req = { userData: user };
  const res = {};
  const next = jest.fn();
  return { req, res, next };
};

describe('Role-based Access Control Middleware', () => {
  it('should allow access if the user role is authorized', () => {
    const user = { _id: '123', role: 'admin' };
    const roles = ['admin', 'user'];
    const { req, res, next } = getMockReqResNext(user);

    const middleware = checkRole(roles);
    middleware(req, res, next);

    expect(next).toBeCalledWith();
  });

  it('should not allow access if the user role is not authorized', () => {
    console.warn = jest.fn();

    const user = { _id: '124', role: 'guest' };
    const roles = ['admin', 'user'];
    const { req, res, next } = getMockReqResNext(user);

    const middleware = checkRole(roles);
    middleware(req, res, next);

    expect(next).toBeCalledWith(expect.any(HttpError));
    expect(console.warn).toBeCalledWith("Someone tried to access unauthorized content with USER_ID:" + user._id);
  });
});
