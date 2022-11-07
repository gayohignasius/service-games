const {
  createUser,
  getUser,
  getUserEmail,
  getUserProfile,
  updateUser,
  updatePassword,
} = require('../user.repository');

const testData = {
  fullname: 'example name',
  email: 'example@gmail.com',
  password: 'Password@123',
};
const userId = 1;
const email = 'example@gmail.com';
const updatedData = {
  userId: 1,
  fullname: 'example name 1',
  email: 'example1@gmail.com',
  password: 'Password@123',
};
const updatedPassword = {
  userId: 1,
  password: 'Password@123!',
};

describe('#user.repo.js', () => {
  describe('createUser function', () => {
    it('should create user', async () => {
      const isUserExists = jest.fn(() => null);
      if (isUserExists) {
        const result = await createUser(testData);
        expect(result.fullname).toBe(testData.fullname);
      }
    });
    it('should failed because duplicate email', async () => {
      const isUserExists = jest.fn(() => {
        return {
          fullname: 'example name',
          email: 'example@gmail.com',
          password: 'Password@123',
        };
      });
      if (isUserExists) {
        const result = await createUser(testData);
        expect(result).toMatchObject({ message: 'User already exist!' });
      }
    });
  });
  describe('getUser function', () => {
    it('should show one record by user id', async () => {
      const result = await getUser({ userId });
      expect(result.userId).toBe(userId);
    });
  });
  describe('getUserProfile function', () => {
    it('should show one record by user id', async () => {
      const result = await getUserProfile({ userId });
      expect(result.userId).toBe(userId);
    });
  });
  describe('getUserEmail function', () => {
    it('should show one record by email', async () => {
      const result = await getUserEmail({ email });
      expect(result.email).toBe(email);
    });
  });
  describe('updateUser function', () => {
    it('should update data user', async () => {
      const result = await updateUser(updatedData);
      expect(result).toBeTruthy();
    });
  });
  describe('updatePassword function', () => {
    it('should update password by user id', async () => {
      const result = await updatePassword(updatedPassword);
      expect(result).toBeTruthy();
    });
  });
});
