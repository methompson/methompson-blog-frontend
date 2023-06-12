import { diffBg, dropShadow } from '@/src/ui/components/image_upload/common_themes';
import { RegularButton } from '@/src/ui/components/regular_button';

const acceptedImageTypes = [
  'image/png',
  'image/jpeg',
  'image/gif',
  'image/heic',
  'image/bmp',
  'image/tiff',
];

interface DragAndDropProps {
  onAddFiles: (files: File[]) => void;
}

export function DragAndDrop(props: DragAndDropProps) {
  function onDrop(ev: React.DragEvent) {
    ev.preventDefault();

    const files: File[] = [];
    for (const item of ev.dataTransfer.items) {
      if (acceptedImageTypes.includes(item.type)) {
        const file = item.getAsFile();

        if (file) {
          files.push(file);
        }
      }
    }

    props.onAddFiles(files);
  };

  function onDragOver(ev: React.DragEvent) {
    ev.preventDefault();
    // console.log('Dragging over the zone');
  };

  const acceptedTypes = acceptedImageTypes.reduce(
    (acc, val) => `${acc},${val}`,
    '',
  ).slice(1);

  return <div className='flex justify-center m-2'>
    <div onDrop={onDrop} onDragOver={onDragOver} className='flex flex-col'>
      <div className={`${diffBg} ${dropShadow} flex flex-col items-center py-4 px-20 rounded-lg select-none`}>
        <span>Drag And Drop</span>
        <span>or</span>
        <span>Hit Add File</span>
      </div>
      <span className='text-center mt-2'>
        <label>
          <input
            type='file'
            className='hidden'
            accept={acceptedTypes}
            onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
              const rawFiles = ev.target.files;

              if (!rawFiles) {
                return;
              }

              const files: File[] = [];

              for (let x = 0; x < rawFiles.length; x++) {
                const file = rawFiles.item(x);
                if (file) {
                  files.push(file);
                }
              }
              props.onAddFiles(files);
            }}/>
          <RegularButton
            text='Add File'
            classes={`${dropShadow} dark:bg-red-700`}
            action={() => {}} />
        </label>
      </span>
    </div>
  </div>;
}