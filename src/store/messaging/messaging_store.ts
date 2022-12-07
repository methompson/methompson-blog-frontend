import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import { MessageType, Message, MessageInterface } from '@/src/models/message';
import { isNullOrUndefined } from '@/src/shared/type_guards';

import {
  MessagePayload,
  MessageCreationRequest,
  InitialStateType,
  AddNewMessagePayload,
  RemoveMessagePayload,
} from './messaging_store_types';

const makeMessage = createAsyncThunk(
  'messaging/makeMessage',
  (req: MessagePayload, thunkAPI) => {
    const message = Message.newMessage(req);

    const timerId = window.setTimeout(() => {
      thunkAPI.dispatch(messagingSlice.actions.removeMessage({ messageId: message.id }));
    }, req.duration);

    thunkAPI.dispatch(messagingSlice.actions.addNewMessage({
      message: message.toJSON(),
      timerId,
    }));
  },
);

const addErrorMessage = createAsyncThunk(
  'messaging/addErrorMessage',
  (req: MessageCreationRequest, thunkAPI) => {
    const duration = req.duration?.inMilliseconds ?? 60000;
    const messageType = MessageType.Error;

    thunkAPI.dispatch(makeMessage({
      messageType,
      message: req.message,
      duration,
    }));
  },
);

const addInfoMessage = createAsyncThunk(
  'messaging/addInfoMessage',
  (req: MessageCreationRequest, thunkAPI) => {
    const duration = req.duration?.inMilliseconds ?? 10000;
    const messageType = MessageType.Info;

    thunkAPI.dispatch(makeMessage({
      messageType,
      message: req.message,
      duration,
    }));
  },
);

const addSuccessMessage = createAsyncThunk(
  'messaging/addSuccessMessage',
  (req: MessageCreationRequest, thunkAPI) => {
    const duration = req.duration?.inMilliseconds ?? 10000;
    const messageType = MessageType.Success;

    thunkAPI.dispatch(makeMessage({
      messageType,
      message: req.message,
      duration,
    }));
  },
);

const initialState: InitialStateType = {
  messages: {},
  messageTimerIds: {},
  loading: false,
};

const messagingSlice = createSlice({
  name: 'messaging',
  initialState,
  reducers: {
    addNewMessage(state, action: PayloadAction<AddNewMessagePayload>) {
      const message = action.payload.message;

      state.messages[message.id] = message;
      state.messageTimerIds[message.id] = action.payload.timerId;
    },
    removeMessage(state, action: PayloadAction<RemoveMessagePayload>) {
      const messageId = action.payload.messageId;

      const timerId = state.messageTimerIds[messageId];

      if (!isNullOrUndefined(timerId)) {
        window.clearTimeout(timerId);
      }

      delete state.messages[messageId];
      delete state.messageTimerIds[messageId];
    },
  },
});

const messagingActions = {
  addErrorMessage,
  addInfoMessage,
  addSuccessMessage,
  removeMessage: messagingSlice.actions.removeMessage,
};

export { messagingSlice, messagingActions };
