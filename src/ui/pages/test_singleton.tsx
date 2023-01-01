import { Message, MessageType } from '@/src/models/message';
import { CenteredStandardPage } from '@/src/ui/components/standard_page';

import { messengerInstance } from '@/src/shared/messenger';

export function TestSingleton() {
  function doSomething() {
    const msg = Message.newMessage({
      messageType: MessageType.Success,
      message: 'A Message',
      duration: 10000,
    });

    messengerInstance.addMessage(msg);
  }

  return <CenteredStandardPage authRestricted={true}>

    <button onClick={() => doSomething()}>
      Button
    </button>
  </CenteredStandardPage>;
}