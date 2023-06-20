import { LinkIcon } from '@heroicons/react/solid';
import { TrashIcon } from '@heroicons/react/solid';

interface IconButtonProps {
  onClick: () => void | Promise<void>;
  className?: string;
}

const colorClasses = 'text-slate-900 hover:text-slate-500 active:text-slate-700';
const darkColorClasses = 'dark:text-slate-300 hover:dark:text-slate-500 dark:active:text-slate-400';
const sizeClasses = 'h-6 w-6 cursor-pointer';

const classes = `${colorClasses} ${darkColorClasses} ${sizeClasses}`;

export function TrashCanButton(props: IconButtonProps) {
  const className = `${classes}  ${props.className ?? ''}`.trim();

  return <TrashIcon
    className={className}
    onClick={props.onClick} />;
}

export function LinkButton(props: IconButtonProps) {
  const className = `${classes}  ${props.className ?? ''}`.trim();

  return <LinkIcon
    className={className}
    onClick={props.onClick}/>;
}