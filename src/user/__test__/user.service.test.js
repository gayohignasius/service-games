const bcrypt = require('bcrypt');
const { faker } = require('@faker-js/faker');
const {
  createUser,
  getUserProfile,
  updateUser,
  resetPassword,
} = require('../user.service');
const userRepo = require('../user.repository');

bcrypt.hash = jest.fn(() => 'test');
describe('#user.service.js', () => {
  describe('createUser function', () => {
    it('should create new user', async () => {
      // given
      const testData1 = {
        fullname: 'gayohignasius',
        email: 'gayohignasius@gmail.com',
        password: 'Password@123',
      };
      //when
      const result = await createUser(testData1);
      // result
      // apakah bcrypt.hash sudah dipanggil?
      expect(bcrypt.hash).toBeCalledWith(testData1.password, 10);
      expect(result.fullname).toBe(testData1.fullname);
      expect(result.email).toBe(testData1.email);
    });
    it('should failed because duplicate email', async () => {
      const testData1 = {
        fullname: 'gayohignasius',
        email: 'gayohignasius@gmail.com',
        password: 'Password@123',
      };
      const result = await createUser(testData1);
      expect(result).toMatchObject({ message: 'User already exist!' });
    });
  });
  describe('getUserProfile function', () => {
    it('should get user data by id', async () => {
      const result = await getUserProfile({ userId: 1 });
      expect(result.userId).toBe(1);
    });
  });
  describe('updateUser function', () => {
    it('should update data user', async () => {
      const result = await updateUser({
        userId: 2,
        fullname: 'gayoh',
        email: 'gayohignasius@gmail.com',
        password: 'test',
      });
      expect(bcrypt.hash).toBeCalledWith('test', 10);
      expect(result).toBeTruthy();
    });
  });
  describe('resetPassword function', () => {
    it('should reset password', async () => {
      const result = await resetPassword({
        userId: 2,
        password: 'test@123',
      });
      expect(bcrypt.hash).toBeCalledWith('test@123', 10);
      expect(result).toBeTruthy();
    });
  });
});
