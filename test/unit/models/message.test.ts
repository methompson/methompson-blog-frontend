import { Message, MessageType } from '@/src/models/message';
import { Duration } from '@/src/shared/duration';

const id = 'id';
const message = 'message';
const timeAdded = 123;
const duration = new Duration({milliseconds: 2000});
const messageType = MessageType.Info;

describe('Message', () => {
  describe('toJSON', () => {
    test('Returns an object of specific structure', () => {
      const msg = new Message(id, message, timeAdded, duration, messageType);

      expect(msg.toJSON()).toStrictEqual({
        id,
        message,
        timeAdded,
        duration: duration.inMilliseconds,
        messageType,
      });
    });
  });

  describe('newMessage', () => {
    const validInput = { message, messageType, duration };

    test('Returns a new message with values provided', () => {
      const msg = Message.newMessage(validInput);

      expect(msg.message).toBe(message);
      expect(msg.messageType).toBe(messageType);
      expect(msg.duration).toBe(duration);
    });

    test('throws an error if invalid values are provided', () => {
      let input: Record<string, unknown>;

      input = { ...validInput };
      delete input.message;
      expect(() => Message.newMessage(input)).toThrow();
    });

    test('Uses a default value if no duration is provided', () => {
      let input: Record<string, unknown>;

      input = { ...validInput };
      delete input.duration;
      const msg = Message.newMessage(input);

      expect(msg.duration.inMilliseconds).toBe(Message.defaultDuration.inMilliseconds);
    });

    test('Uses a default value if no messageType is provided', () => {
      let input: Record<string, unknown>;

      input = { ...validInput };
      delete input.messageType;
      const msg = Message.newMessage(input);
      expect(msg.messageType).toBe(Message.defaultMessageType);
    });
  });

  describe('fromJSON', () => {
    const validInput = {
      id,
      message,
      timeAdded,
      duration: duration.inMilliseconds,
      messageType,
     };

    test('Returns a message object with passed in values', () => {
      const msg = Message.fromJSON({
        id,
        message,
        timeAdded,
        duration: duration.inMilliseconds,
        messageType,
      });
      expect(msg.toJSON()).toStrictEqual({
        id,
        message,
        timeAdded,
        duration: duration.inMilliseconds,
        messageType,
      });
    });

    test('Throws an error if the input is invalid', () => {
      // Confirm that the input works.
      expect(() => Message.fromJSON(validInput)).not.toThrow();

      let input: Record<string, unknown>;

      input = { ...validInput };
      delete input.id;
      expect(() => Message.fromJSON(input)).toThrow();

      input = { ...validInput };
      delete input.message;
      expect(() => Message.fromJSON(input)).toThrow();

      input = { ...validInput };
      delete input.timeAdded;
      expect(() => Message.fromJSON(input)).toThrow();

      input = { ...validInput };
      delete input.duration;
      expect(() => Message.fromJSON(input)).toThrow();

      input = { ...validInput };
      delete input.messageType;
      expect(() => Message.fromJSON(input)).toThrow();
    });

    test('toJSON can be fed into fromJSON and have the same results', () => {
      const msg1 = Message.fromJSON(validInput);
      const msg2 = Message.fromJSON(msg1.toJSON());

      expect(msg1.toJSON()).toStrictEqual(msg2.toJSON());
    });
  });

  describe('isMessageInterface', () => {
    const validInput = {
      id,
      message,
      timeAdded,
      duration: duration.inMilliseconds,
      messageType,
    };

    test('returns true for a valid input', () => {
      expect(Message.isMessageInterface(validInput)).toBe(true);
    });

    test('returns false for an invalid input', () => {
      let input: Record<string, unknown>;

      input = { ...validInput };
      delete input.id;
      expect(Message.isMessageInterface(input)).toBe(false);

      input = { ...validInput };
      delete input.message;
      expect(Message.isMessageInterface(input)).toBe(false);

      input = { ...validInput };
      delete input.timeAdded;
      expect(Message.isMessageInterface(input)).toBe(false);

      input = { ...validInput };
      delete input.duration;
      expect(Message.isMessageInterface(input)).toBe(false);

      input = { ...validInput };
      delete input.messageType;
      expect(Message.isMessageInterface(input)).toBe(false);
    });

    test('returns false if other data types are passed in', () => {
      expect(Message.isMessageInterface(true)).toBe(false);
      expect(Message.isMessageInterface(1)).toBe(false);
      expect(Message.isMessageInterface('true')).toBe(false);
      expect(Message.isMessageInterface(null)).toBe(false);
      expect(Message.isMessageInterface(undefined)).toBe(false);
      expect(Message.isMessageInterface({})).toBe(false);
      expect(Message.isMessageInterface([])).toBe(false);
    });
  });

  describe('isNewMessageInterface', () => {
    const validInput = { message, messageType, duration };

    test('returns true for a valid input', () => {
      expect(Message.isNewMessageInterface(validInput)).toBe(true);

      expect(Message.isNewMessageInterface({
        ...validInput,
        duration: duration.inMilliseconds,
      })).toBe(true);
    });

    test('returns false for an invalid input', () => {
      let input: Record<string, unknown>;

      input = { ...validInput };
      delete input.message;
      expect(Message.isNewMessageInterface(input)).toBe(false);
    });

    test('returns true if there is no duration value', () => {
      const input: Record<string, unknown> = { ...validInput };
      delete input.duration;

      expect(Message.isNewMessageInterface(validInput)).toBe(true);
    });

    test('returns true if there is no messageType value', () => {
      const input: Record<string, unknown> = { ...validInput };
      delete input.messageType;

      expect(Message.isNewMessageInterface(validInput)).toBe(true);
    });

    test('returns false if other data types are passed in', () => {
      expect(Message.isNewMessageInterface(true)).toBe(false);
      expect(Message.isNewMessageInterface(1)).toBe(false);
      expect(Message.isNewMessageInterface('true')).toBe(false);
      expect(Message.isNewMessageInterface(null)).toBe(false);
      expect(Message.isNewMessageInterface(undefined)).toBe(false);
      expect(Message.isNewMessageInterface({})).toBe(false);
      expect(Message.isNewMessageInterface([])).toBe(false);
    });
  });
});