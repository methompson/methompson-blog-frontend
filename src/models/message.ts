import { v4 } from 'uuid';

import {
  isRecord,
  isString,
  isNumber,
  isStringOrNullOrUndefined,
  isNumberOrNullOrUndefined,
} from '@src/shared/type_guards';
import { InvalidInputError } from '@src/errors/invalid_input_error';

interface MessageInterface {
  id: string;
  message: string;
  timeAdded: number;
  duration: number;
  messageType: string;
}

interface NewMessageInterface {
  message: string;
  messageType?: string;
  duration?: number;
}

interface MessageDurationInterface {
  milliseconds?: number;
  seconds?: number;
  minutes?: number;
  hours?: number;
}

class Message {
  constructor(
    protected _id: string,
    protected _message: string,
    protected _timeAdded: number,
    protected _duration: number,
    protected _messageType: string,
  ) {}

  get id() {
    return this._id;
  }
  get message() {
    return this._message;
  }
  get timeAdded() {
    return this._timeAdded;
  }
  get duration() {
    return this._duration;
  }
  get messageType() {
    return this._messageType;
  }

  toJSON(): MessageInterface {
    return {
      id: this._id,
      message: this._message,
      timeAdded: this._timeAdded,
      duration: this._duration,
      messageType: this._messageType,
    };
  }

  // 1 minute
  static get defaultDuration(): number {
    return 60 * 1000;
  }

  static get defaultMessageType(): string {
    return 'info';
  }

  static newMessage(input: unknown): Message {
    if (!Message.isNewMessageInterface(input)) {
      throw new InvalidInputError('Invalid new message input');
    }

    const id = v4();
    const duration = input.duration ?? Message.defaultDuration;
    const messageType = input.messageType ?? Message.defaultMessageType;

    const now = Date.now();

    return new Message(
      id,
      input.message,
      now,
      duration,
      messageType,
    );
  }

  static fromJSON(input: unknown) {
    if (!Message.isMessageInterface(input)) {
      throw new InvalidInputError('Invalid input for Message');
    }

    return new Message(
      input.id,
      input.message,
      input.timeAdded,
      input.duration,
      input.messageType,
    );
  }

  static isMessageInterface(input: unknown): input is MessageInterface {
    return isRecord(input)
      && isString(input.id)
      && isString(input.message)
      && isString(input.messageType)
      && isNumber(input.timeAdded)
      && isNumber(input.duration);
  }

  static isNewMessageInterface(input: unknown): input is NewMessageInterface {
    return isRecord(input)
      && isString(input.message)
      && isStringOrNullOrUndefined(input.messageType)
      && isNumberOrNullOrUndefined(input.duration);
  }
}

export { Message };