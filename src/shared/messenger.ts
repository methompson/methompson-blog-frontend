import { Message, MessageCollection } from '@/src/models/message';

class Messenger {
  private messages: Record<string, Message> = {};
  private timers: Record<string, number> = {};

  // Messaging Ops are functions that are run when the messages are changed, either
  // by adding or removing a message.
  private messagingOps: ((msg: MessageCollection) => void)[] = [];

  get messageCollection(): MessageCollection {
    return new MessageCollection(this.messages);
  }

  addMessage(message: Message) {
    this.messages[message.id] = message;

    const timerId = window.setTimeout(() => this.removeMessage(message.id), message.duration);
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