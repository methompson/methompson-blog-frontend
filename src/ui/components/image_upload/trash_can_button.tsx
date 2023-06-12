import { TrashIcon } from '@heroicons/react/solid';

interface TrashCanButtonProps {
  onClick: () => void;
}

export function TrashCanButton(props: TrashCanButtonProps) {
  const colorClasses = 'text-slate-900 hover:text-slate-500 active:text-slate-700';
  const darkColorClasses = 'dark:text-slate-300 hover:dark:text-slate-500 dark:active:text-slate-400';
  const sizeClasses = 'h-6 w-6 cursor-pointer';

  const classes = `${colorClasses} ${darkColorClasses} ${sizeClasses}`;

  return <TrashIcon
    className={classes}
    onClick={props.onClick} />;
}