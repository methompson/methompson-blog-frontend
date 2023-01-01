import { Message, MessageCollection, MessageType } from '@/src/models/message';
import { Duration } from '@/src/shared/duration';
import { isNull, isNullOrUndefined } from './type_guards';

interface AddMessageInterface {
  message: string | JSX.Element;
  duration?: Duration;
}

class Messenger {
  private messages: Record<string, Message> = {};
  private timers: Record<string, number> = {};

  // Messaging Ops are functions that are run when the messages are changed, either
  // by adding or removing a message.
  private messagingOps: ((msg: MessageCollection) => void)[] = [];

  get messageCollection(): MessageCollection {
    return new MessageCollection(this.messages);
  }

  // TODO
  addSuccessMessage(message: AddMessageInterface) {
    this.makeNewMessage(message, MessageType.Success);
  }

  addInfoMessage(message: AddMessageInterface) {
    this.makeNewMessage(message, MessageType.Info);
  }

  addErrorMessage(message: AddMessageInterface) {
    this.makeNewMessage(message, MessageType.Error);
  }

  makeNewMessage(message: AddMessageInterface, messageType: MessageType) {
    const msgData: Record<string, unknown> = {
      messageType,
      message: message.message,
    };

    if (!isNullOrUndefined(message.duration)) {
      msgData.duration = message.duration.inMilliseconds;
    }

    const msg = Message.newMessage(msgData);

    this.addMessage(msg);
  }

  addMessage(message: Message) {
    this.messages[message.id] = message;

    const timerId = window.setTimeout(() => this.removeMessage(message.id), message.duration.inMilliseconds);
    this.timers[message.id] = timerId;

    this.notifySubscribers();
  }

  removeMessage(id: string) {
    clearTimeout(this.timers[id]);
    delete this.timers[id];
    delete this.messages[id];

    this.notifySubscribers();
  }

  registerMessagingOp(op: (msg: MessageCollection) => void) {
    let included = this.messagingOps.reduce((acc: boolean, curr) => {
      if (curr === op) {
        return true;
      }

      return acc;
    }, false);

    if (!included) {
      this.messagingOps.push(op);
    }
  }

  unregisterMessagingOp(op: (msg: MessageCollection) => void) {
    const registrars = this.messagingOps.filter((r) => r !== op);
    this.messagingOps = registrars;
  }

  notifySubscribers() {
    const col = this.messageCollection;
    this.messagingOps.forEach((op) => op(col));
  }
}

export const messengerInstance = new Messenger();