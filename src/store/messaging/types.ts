import { Duration } from '@src/shared/duration';
import { MessageType, MessageInterface } from '@src/models/message';

export interface MessagePayload {
  messageType: MessageType;
  message: string;
  duration: number;
}

export interface MessageCreationRequest {
  message: string;
  duration?: Duration;
}

export type InitialStateType = {
  messages: Record<string, MessageInterface>,
  messageTimerIds: Record<string, number>,
  loading: boolean,
};

export interface AddNewMessagePayload {
  message: MessageInterface,
  timerId: number,
}

export interface RemoveMessagePayload {
  messageId: string,
}