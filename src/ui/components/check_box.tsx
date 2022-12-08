import { useState } from 'react';

import { CheckIcon } from '@heroicons/react/solid';

interface CheckBoxProps {
  onCheck: ((checked: boolean) => Promise<void>) | ((checked: boolean) => void);
  startingValue?: boolean;
  commonStyles?: string;
  checkedStyles?: string;
  uncheckedStyles?: string;
}

export function CheckBox(props: CheckBoxProps) {
  const startingValue = props.startingValue ?? false;
  const [checked, setChecked] = useState(startingValue);

  const onClick = () => {
    const newCheck = !checked;
    setChecked(newCheck);
    props.onCheck(newCheck);
  };

  const checkedStyles = props.checkedStyles ?? '';
  const uncheckedStyles = props.uncheckedStyles ?? '';
  const commonStyles = props.commonStyles ?? '';

  const size = 'h-5 w-5';
  const outline = 'ring-1 ring-slate-300 dark:ring-slate-800';
  const shadow = 'shadow-lg dark:shadow-slate-900';
  const commonStyle = `${size} ${outline} ${shadow} ${commonStyles}`;
  const checkedBoxStyle = `bg-red-500 dark:bg-red-700 h-5 w-5 ${checkedStyles}`;
  const unCheckedBoxStyle = `bg-white dark:bg-slate-500 ${uncheckedStyles}`;

  const currentStyle = checked ? checkedBoxStyle : unCheckedBoxStyle;

  const interior = checked ? <CheckIcon className='text-slate-100' /> : <div />;

  return <div
    onClick={onClick}
    className={`select-none ${commonStyle} ${currentStyle}`}
  >
    {interior}
  </div>;
}