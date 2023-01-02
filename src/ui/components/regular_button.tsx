interface ButtonProps {
  action: (() => Promise<void>) | (() => void);
  text: string;
  classes?: string;
  disabled?: boolean;
}

export function RegularButton(props: ButtonProps) {
  const colorClasses = 'bg-red-500 hover:bg-red-600 active:bg-red-500 text-white';
  const darkColorClasses = 'dark:bg-red-700 dark:hover:bg-red-600 dark:active:bg-red-700';
  const spaceClasses = 'inline-block rounded-md p-2 mb-2 cursor-pointer text-center ';

  const baseClasses = `${spaceClasses} ${props.classes ?? ''} select-none`;

  const disabledColorClasses = 'bg-slate-300 text-slate-500 dark:bg-slate-700 dark:text-slate-500';

  const classes = props.disabled
    ? `${disabledColorClasses} ${baseClasses}`
    : `${colorClasses} ${darkColorClasses} ${baseClasses}`;

    classes.trim();

  const onClick = props.disabled ? () => {} : props.action;

  return (
    <span
      className={classes}
      onClick={onClick}>
      {props.text}
    </span>
  );
}

export function FullWidthButton(props: ButtonProps) {
  let classes = `${props.classes ?? ''} w-full`;

  return <RegularButton
    action={props.action}
    text={props.text}
    classes={classes} />;
}