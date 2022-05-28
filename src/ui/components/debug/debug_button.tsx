import React from 'react';

interface DebugButtonProps {
  title: string;
  action?: (() => Promise<void>) | (() => void);
}

export default function DebugButton(props: DebugButtonProps) {
  return (
    <button
      className='bg-red-500 hover:bg-red-700 text-white rounded-sm p-2 mb-2'
      onClick={props.action} >
      {props.title}
    </button>
  );
}