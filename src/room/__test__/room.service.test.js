const roomRepo = require('../room.repo');
const { createRoom, getAllRoom } = require('../room.service');

roomRepo.createRoom = jest.fn();
describe('#room.service.js', () => {
  describe('createRoom function', () => {
    it('should create new room', async () => {
      const testData1 = {
        roomName: 'breeze',
        hostUserId: 2,
      };
      const result = await createRoom(testData1);
      expect(result.roomName).toBe(testData1.roomName);
    });
  });
  describe('getAllRoom function', () => {
    it('should get all room lists', async () => {
      const result = await getAllRoom();
      expect(result.length).not.toBe(0);
    });
  });
  describe('findRoom function', () => {
    it('should get room data by id', async () => {
      const roomId = 1;
      const result = await findRoom(roomId);
      expect(result.roomId).toBe(roomId);
    });
  });
  describe('getRoomId function', () => {
    it('should find room with code (generated string)', async () => {
      const room = await findRoom(1);
      testData1 = {
        roomCode: room.roomCode,
      };
      const result = await findRoomWithCode(testData1);
      expect(result.roomCode).toBe(testData1.roomCode);
    });
  });
});
