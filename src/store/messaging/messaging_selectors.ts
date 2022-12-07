import { StateType } from '@/src/store';

import { MessageCollection } from '@/src/models/message';

export const messages = (state: StateType) => {
  const messageCollection = MessageCollection.fromJSON(Object.values(state.messaging.messages));

  return messageCollection;
};

export const isLoading = (state: StateType) => state.messaging.loading;