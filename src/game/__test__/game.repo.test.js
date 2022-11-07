const { findUser, findRoom, updateGame } = require('../game.repo');

describe('#game.repo.js', () => {
  describe('findUser function', () => {
    it('should find user by id', async () => {
      const userId = 1;
      const result = await findUser(userId);
      expect(result.userId).toBe(userId);
    });
  });
  describe('findRoom function', () => {
    it('should find room by id', async () => {
      const roomId = 1;
      const result = await findRoom(roomId);
      console.log(result);
      expect(result.roomId).toBe(roomId);
    });
  });
  describe('updateGame function', () => {
    it('should update game status by id', async () => {
      const updatedValues = 1;
      const roomId = 1;
      const result = await updateGame(updatedValues, roomId);
      expect(result.roomId).toBe(roomId);
    });
  });
  describe('updateUserPoint function', () => {
    it(`should update users's point by id`, async () => {
      let addedPoint = +1;
      const userId = 1;
      const result = await updateGame({ userId, addedPoint });
      console.log(result);
      expect(result.userId).toBe(userId);
    });
  });
});
