import { diffBg, dropShadow } from '@/src/ui/components/image_upload/common_themes';
import { RegularButton } from '@/src/ui/components/regular_button';

interface UploadButtonProps {
  action: () => Promise<void>;
  enabled: boolean;
}

export function UploadButton(props: UploadButtonProps) {
  return <div id='uploadingButton' className='text-center'>
    <RegularButton
      disabled={!props.enabled}
      text='Upload Images'
      classes={`${dropShadow} text-xl font-bold`}
      action={props.action} />
  </div>;
}

export function SubtmittingButton() {
  const lightSubmitColors = 'bg-red-200 text-red-500 hover:bg-red-200 hover:text-red-500';
  const darkSubmitColors = 'dark:bg-red-300 dark:text-red-700 hover:dark:bg-red-300 hover:dark:text-red-700';
  return <div id='submittingButton' className='text-center'>
    <RegularButton
      disabled={true}
      text='Uploading'
      classes={`${dropShadow} ${lightSubmitColors} ${darkSubmitColors} text-xl font-bold cursor-progress`}
      action={() => {}} />
  </div>;
}