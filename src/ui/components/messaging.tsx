import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { XIcon } from '@heroicons/react/solid';

import { actions, AppDispatch, selectors } from '@/src/store';

import { MessageType, Message, MessageCollection } from '@/src/models/message';

import { messengerInstance } from '@/src/shared/messenger';

function messageDiff(currentMessages: MessageCollection, storeMessages: MessageCollection) {
  let hasDiff = false;

  const newMessages: Record<string, Message> = {};
  storeMessages.list.forEach((el) => {
    if (!currentMessages.hasMessage(el.id)) {
      newMessages[el.id] = el;
      hasDiff = true;
    }
  });

  const deletedMessages: Record<string, Message> = {};
  currentMessages.list.forEach((el) => {
    if (!storeMessages.hasMessage(el.id)) {
      deletedMessages[el.id] = el;
      hasDiff = true;
    }
  });

  return {
    newMessages,
    deletedMessages,
    hasDiff,
  };
}

export function MessagingComponent() {
  // const storeMessages = useSelector(selectors.messages);
  const [messageCollection, setMessageCollection] = useState<MessageCollection>(new MessageCollection({}));
  const [currentMessages, setCurrentMessages] = useState<MessageCollection>(new MessageCollection({}));

  useEffect(() => {
    messengerInstance.registerMessagingOp((col) => setMessageCollection(col));
  }, []);

  const diff = messageDiff(currentMessages, messageCollection);

  const messagesToShow = currentMessages.copy();

  // We add NEW messages here so that they appear immediately.
  Object.values(diff.newMessages).forEach((msg) => {
    messagesToShow.addMessage(msg);
  });

  // If we have a diff, we'll set a timeout to change the messages over.
  // This gives the message time to disappear via CSS. Below we use the deleted
  // messages diff to show an animation.
  if (diff.hasDiff) {
    setTimeout(() => {
      setCurrentMessages(messageCollection.copy());
    }, 255);
  }

  const classNames = [
    'messagingContainer',
    'pointer-events-none',
    'w-screen',
    'h-screen',
    'fixed',
    'top-0',
    'right-0',
    'p-4',
    'flex',
    'flex-col',
    'justify-end',
    'items-center',
  ];

  const messageOutput = currentMessages.listByDate.map((el) => {
    const closed = !messageCollection.hasMessage(el.id);

    switch (el.messageType) {
      case MessageType.Error:
        return <ErrorCard message={el} closed={closed} key={el.id} />;
      case MessageType.Success:
        return <SuccessCard message={el} closed={closed} key={el.id} />;
      default:
        return <InfoCard message={el} closed={closed} key={el.id} />;
    }
  });

  return (
    <div className={classNames.join(' ')}>
      {messageOutput}
    </div>
  );
}

interface TypeMessageCardProps {
  message: Message;
  closed?: boolean;
}

function ErrorCard(props: TypeMessageCardProps) {
  return <MessageCard
    backgroundColor='bg-red-500'
    textColor='text-red-50'
    message={props.message}
    closed={props.closed} />;
}

function SuccessCard(props: TypeMessageCardProps) {
  return <MessageCard
    backgroundColor='bg-green-500'
    textColor='text-green-50'
    message={props.message}
    closed={props.closed} />;
}

function InfoCard(props: TypeMessageCardProps) {
  return <MessageCard
    backgroundColor='bg-indigo-500'
    textColor='text-indigo-50'
    message={props.message}
    closed={props.closed} />;
}

interface MessageCardProps {
  backgroundColor: string;
  textColor: string;
  message: Message;
  closed?: boolean;
}

function MessageCard(props: MessageCardProps) {
  // const dispatch = useDispatch<AppDispatch>();

  const cardClasses = [
    'messageCard',
    'container',
    'rounded-md',
    'p-2',
    'mt-3',
    'flex',
    'flex-row',
    'justify-between',
    'items-center',
    'pointer-events-auto',
    props.backgroundColor,
    props.textColor,
  ];

  if (props.closed === true) {
    cardClasses.push('closed');
  }

  const iconClasses = [
    'h-8',
    'w-8',
    'messageIcon',
    props.textColor,
  ];

  function close() {
    messengerInstance.removeMessage(props.message.id);
    // dispatch(actions.removeMessage({ messageId: props.message.id }));
  }

  return <div className={cardClasses.join(' ')}>
    <span>{props.message.message}</span>

    <button onClick={close}>
      <XIcon className={iconClasses.join(' ')} />
    </button>
  </div>;
}