import { v4 } from 'uuid';

import {
  isRecord,
  isString,
  isNumber,
  isStringOrNullOrUndefined,
  isNumberOrNullOrUndefined,
  isNullOrUndefined,
} from '@/src/shared/type_guards';
import { InvalidInputError } from '@/src/errors/invalid_input_error';
import React from 'react';
import { Duration } from '@/src/shared/duration';

interface MessageInterface {
  id: string;
  message: string | JSX.Element;
  timeAdded: number;
  duration: number;
  messageType: string;
}

interface NewMessageInterface {
  message: string | JSX.Element;
  messageType?: string;
  duration?: Duration | number;
}

enum MessageType {
  Info = 'info',
  Success = 'success',
  Error = 'error',
}

class Message {
  constructor(
    protected _id: string,
    protected _message: string | JSX.Element,
    protected _timeAdded: number,
    protected _duration: Duration,
    protected _messageType: MessageType,
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
      duration: this._duration.inMilliseconds,
      messageType: this._messageType,
    };
  }

  // 1 minute
  static get defaultDuration(): Duration {
    return new Duration({minutes: 1});
  }

  static get defaultMessageType(): MessageType {
    return MessageType.Info;
  }

  static makeMessageType(messageType: string | undefined): MessageType {
    switch (messageType?.toLowerCase()) {
      case 'error':
        return MessageType.Error;
      case 'success':
        return MessageType.Success;
      default:
        return MessageType.Info;
    }
  }

  static newMessage(input: unknown): Message {
    if (!Message.isNewMessageInterface(input)) {
      throw new InvalidInputError('Invalid new message input');
    }

    const id = v4();
    let duration: Duration = Message.defaultDuration;

    if (isNumber(input.duration)) {
      duration = new Duration({milliseconds: input.duration});
    } else if (input.duration instanceof Duration) {
      duration = input.duration;
    }

    // const duration = input.duration ?? Message.defaultDuration;
    const messageType = Message.makeMessageType(input.messageType) ?? Message.defaultMessageType;

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
      new Duration({milliseconds: input.duration}),
      Message.makeMessageType(input.messageType),
    );
  }

  static isMessageInterface(input: unknown): input is MessageInterface {
    return isRecord(input)
      && isString(input.id)
      && (isString(input.message) || React.isValidElement(input.message))
      && isString(input.messageType)
      && isNumber(input.timeAdded)
      && isNumber(input.duration);
  }

  static isNewMessageInterface(input: unknown): input is NewMessageInterface {
    return isRecord(input)
      && (isString(input.message) || React.isValidElement(input.message))
      && isStringOrNullOrUndefined(input.messageType)
      && (isNullOrUndefined(input.duration) || input.duration instanceof Duration || isNumber(input.duration));
  }
}

class MessageCollection {
  constructor(
    protected _messages: Record<string, Message>,
  ) {}

  get messages(): Record<string, Message> {
    return { ...this._messages };
  }

  get list(): Message[] {
    return Object.values(this._messages);
  }

  get listByDate(): Message[] {
    const messages = Object.values(this._messages).sort((a, b) => {
      if (a.timeAdded < b.timeAdded) return -1;
      if (a.timeAdded > b.timeAdded) return 1;
      return 0;
    });

    return messages;
  }

  get totalMessages(): number {
    return this.list.length;
  }

  hasMessage(id: string): boolean {
    return this._messages[id] !== undefined;
  }

  addMessage(msg: Message) {
    this._messages[msg.id] = msg;
  }

  copy(): MessageCollection {
    return new MessageCollection({...this._messages});
  }

  static fromJSON(input: unknown): MessageCollection {
    if (!Array.isArray(input)) {
      throw new InvalidInputError('Invalid input for Message');
    }

    const messages: Record<string, Message> = {};

    for (const el of input) {
      const msg = Message.fromJSON(el);
      messages[msg.id] = msg;
    }

    return new MessageCollection(messages);
  }
}

export {
  Message,
  MessageCollection,
  MessageType,
  MessageInterface,
};