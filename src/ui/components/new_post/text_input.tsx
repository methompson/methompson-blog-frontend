import React, { useEffect, useState } from 'react';

interface TextInputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  value: string;
  className?: string;
  name?: string;
  border?: boolean;
  type?: string;
}

export function TextInput(props: TextInputProps) {
  const [value, setValue] = useState(props.value ?? '');

  function setInputValue(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
    props.onChange(e);
  }

  let classes = 'p-2 mr-1 placeholder:italic placeholder:text-slate-400'
    + ' text-lg sm:text-md';

  if (props.border !== false) {
    classes += ' border border-slate-300 rounded-md shadow-sm'
      + ' focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1';
  } else {
    classes += ' focus-visible:outline-none';
  }

  if (props.className !== null && props.className !== undefined) {
    classes += ` ${props.className}`;
  }

  const name = props.name ?? '';
  const type = props.type ?? 'text';

  return <input
    className={classes}
    placeholder={props.placeholder ?? ''}
    value={value}
    type={type}
    name={name}
    onFocus={props.onFocus}
    onBlur={props.onBlur}
    onChange={setInputValue} />;
}

interface LabeledTextInputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  value: string;
  stretch?: boolean;
  className?: string;
}

export function LabeledTextInput(props: LabeledTextInputProps) {
  const [focus, setFocus] = useState(false);

  let labelClasses = 'labeledTextInput relative block my-3 border border-slate-300 rounded-md shadow-sm';
  let textInputClasses = '';

  if (focus) {
    labelClasses += ' outline-none border-sky-500 ring-sky-500 ring-1';
  }

  if (props.stretch === true) {
    labelClasses += ' flex justify-between flex-row items-center ';
    textInputClasses = 'grow';
  }

  return (
    <label className={labelClasses} htmlFor={props.name}>
      <span className='p-2 text-slate-400'>
        {props.name}
      </span>
      <TextInput
        onChange={props.onChange}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        name={props.name}
        value={props.value}
        border={false}
        className={textInputClasses} />
    </label>
  );
}