const HttpError = require('../../../classes/HttpError');

describe('HttpError Class', () => {
  it('should create an HttpError with message and statusCode', () => {
    const error = new HttpError('Not found', 404);
    expect(error.message).toBe('Not found');
    expect(error.code).toBe(404);
  });
});
