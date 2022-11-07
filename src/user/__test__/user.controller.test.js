const { faker } = require('@faker-js/faker');
const httpMocks = require('node-mocks-http');
const userService = require('../user.service');
const {
  createUser,
  getUserProfile,
  updateUser,
  resetPassword,
} = require('../user.controller');
let req;
let res;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
});

userService.createUser = jest.fn();
userService.getUserProfile = jest.fn();
userService.updateUser = jest.fn();
userService.resetPassword = jest.fn();

describe('#user.controller.js', () => {
  describe('createUser function', () => {
    it('should create new user', async () => {
      const testData1 = {
        fullname: 'gayoh',
        email: 'gayohignasius@gmail.com',
        password: 'Password@123',
      };
      req.body = testData1;
      userService.createUser.mockReturnValue(testData1);
      const result = await createUser(req, res);
      expect(result.statusCode).toBe(200);
    });
    it('should failed create new user because duplicate email', async () => {
      const testData1 = {
        fullname: 'gayoh',
        email: 'gayohignasius@gmail.com',
        password: 'Password@123',
      };
      req.body = testData1;
      userService.createUser.mockReturnValue({
        message: 'User already exist!',
      });
      const result = await createUser(req, res);
      expect(result._getJSONData()).toMatchObject({
        message: 'User already exist!',
      });
    });
    it('should failed create new user because the server error', async () => {
      userService.createUser.mockRejectedValue(new Error());
      const result = await createUser(req, res);
      expect(result._getJSONData()).toMatchObject({
        message: 'Internal server error!',
      });
    });
  });
  describe('getUserProfile function', () => {
    it('should get user data by id', async () => {
      const testData1 = {
        userId: 1,
        id: 1,
        fullname: faker.name.fullName(),
        email: faker.internet.email(),
        totalPoint: 2,
      };
      const { userId } = testData1;
      req.body = testData1;
      req.auth = { id: userId };
      userService.getUserProfile.mockReturnValue(testData1);
      const result = await getUserProfile(req, res);
      expect(result.statusCode).toBe(200);
    });
    it('should failed get user data by id because the server error', async () => {
      const testData1 = {
        userId: 1,
        id: 1,
        fullname: faker.name.fullName(),
        email: faker.internet.email(),
        totalPoint: 2,
      };
      const { userId } = testData1;
      req.body = testData1;
      req.auth = { id: userId };
      userService.getUserProfile.mockRejectedValue(new Error());
      const result = await getUserProfile(req, res);
      expect(result._getJSONData()).toMatchObject({
        message: 'Internal server error!',
      });
    });
  });
  describe('updateUser function', () => {
    it('should update user data by id', async () => {
      const testData1 = {
        userId: 1,
        fullname: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      };
      const { userId } = testData1;
      req.body = testData1;
      req.auth = { id: userId };
      userService.updateUser.mockReturnValue(testData1);
      const result = await updateUser(req, res);
      expect(result.statusCode).toBe(200);
    });
    it('should failed update user data because the server error', async () => {
      const testData1 = {
        userId: 1,
        fullname: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      };
      req.body = testData1;
      req.auth = { id: 1 };
      userService.updateUser.mockRejectedValue(new Error());
      const result = await updateUser(req, res);
      expect(result._getJSONData()).toMatchObject({
        message: 'Internal server error!',
      });
    });
  });
  describe('resetPassword function', () => {
    it('should update password', async () => {
      const testData1 = {
        userId: 1,
        password: 'Password@123',
        confirmpassword: 'Password@123',
      };
      const { userId } = testData1;
      req.body = testData1;
      req.auth = { id: userId };
      userService.resetPassword.mockReturnValue(testData1);
      const result = await resetPassword(req, res);
      expect(result.statusCode).toBe(200);
    });
    it('should failed update password because the confirmation password is different with password', async () => {
      const testData1 = {
        userId: 1,
        password: 'old_password@123',
        confirmpassword: 'new_password@123',
      };
      req.body = testData1;
      req.auth = { id: 1 };
      userService.resetPassword.mockRejectedValue(new Error());
      const result = await resetPassword(req, res);
      expect(result.statusCode).toBe(400);
      expect(result._getJSONData()).toMatchObject({
        message: 'Password is not matched',
      });
    });
    it('should failed update password because the server error', async () => {
      const testData1 = {
        userId: 1,
        password: 'Password@123',
        confirmpassword: 'Password@123',
      };
      req.body = testData1;
      req.auth = { id: 1 };
      userService.resetPassword.mockRejectedValue(new Error());
      const result = await resetPassword(req, res);
      expect(result._getJSONData()).toMatchObject({
        message: 'Internal server error!',
      });
    });
  });
});
