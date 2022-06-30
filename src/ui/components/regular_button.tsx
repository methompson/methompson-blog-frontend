interface ButtonProps {
  action: (() => Promise<void>) | (() => void);
  text: string;
  classes?: string;
}

export function RegularButton(props: ButtonProps) {
  let classes = 'bg-red-500 hover:bg-red-700 text-white rounded-md p-2 mb-2 ';

  classes += props.classes ?? '';
  classes.trim();

  return (
    <button
      className={classes}
      onClick={props.action}>
      {props.text}
    </button>
  );
}

export function FullWidthButton(props: ButtonProps) {
  let classes = `${props.classes ?? ''} w-full`;

  return <RegularButton
    action={props.action}
    text={props.text}
    classes={classes} />;
}