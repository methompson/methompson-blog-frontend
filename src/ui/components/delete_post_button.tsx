import { RegularButton } from './regular_button';

interface DeletePostButtonProps {
  action: (() => Promise<void>) | (() => void);
}

export function DeletePostButton(props: DeletePostButtonProps) {
  return <RegularButton
    action={props.action}
    text="Delete Blog Post" />;
}