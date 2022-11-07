const {
  findRoomWithCode,
  createRoom,
  findRoom,
  updateRoom,
  getAllRoom,
} = require('../room.repo');

describe('#room.repo.js', () => {
  describe('createRoom function', () => {
    it('should create new room', async () => {
      testData1 = {
        roomName: 'haven',
        hostUserId: 1,
      };
      const result = await createRoom(testData1);
      expect(result.roomName).toBe(testData1.roomName);
    });
  });
  describe('findRoomWithCode function', () => {
    it('should find room with code (generated string)', async () => {
      const room = await findRoom(1);
      testData1 = {
        roomCode: room.roomCode,
      };
      const result = await findRoomWithCode(testData1);
      expect(result.roomCode).toBe(testData1.roomCode);
    });
  });
  describe('updateRoom function', () => {
    it('should update room with host and guest data', async () => {
      const testData1 = {
        id: 1,
        guestUserId: 2,
        hostScore: 0,
        guestScore: 0,
        hostSelection: 1,
        guestSelection: 2,
        turn: 3,
        isFinished: true,
      };
      const result = await updateRoom(testData1);
      expect(result).toStrictEqual([0]);
    });
  });
  describe('updateGuestUser function', () => {
    it('should update guest user id', async () => {
      const testData1 = {
        id: 1,
        guestUserId: 2,
      };
      const result = await updateRoom(testData1);
      expect(result).toStrictEqual([0]);
    });
  });
  describe('getAllRoom function', () => {
    it('should list of all rooms', async () => {
      const result = await getAllRoom();
      expect(result.length).not.toBe(0);
    });
  });
  describe('findRoom function', () => {
    it('should find room by id', async () => {
      const roomId = 1;
      const result = await findRoom(roomId);
      expect(result.roomId).toBe(roomId);
    });
  });
});
