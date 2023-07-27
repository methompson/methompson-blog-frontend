import { useState } from 'react';

import { CheckBox } from '@/src/ui/components/check_box';
import { TextInput } from '@/src/ui/components/text_input';
import { ImageOp } from '@/src/shared/image_op';
import { diffBg, dropShadow } from '@/src/ui/components/file_upload/common_themes';
import { RegularButton } from '@/src/ui/components/regular_button';

interface AddImageOpProps {
  addImageOp: (op: ImageOp) => void;
}

export function AddImageOps(props: AddImageOpProps) {
  const [identifier, setIdentifier] = useState('');
  const [imageFormat, setImageFormat] = useState('same');
  const [longestSideRes, setLongestSideRes] = useState('');
  const [longestSideResErr, setLongestSideResErr] = useState(false);
  const [isPrivate, setIsPrivate] = useState(true);

  const flexBetween = 'flex flex-row justify-between items-center py-2';
  const leftSide = 'w-2/3';
  const rightSide = 'w-1/3';

  const errorHighlight = 'ring-1 ring-red-500 focus:ring-red-500 border-red-500 focus:border-red-500';

  const longestSideResClass = longestSideResErr ? errorHighlight : '';

  const errors = [];

  if (longestSideResErr) {
    const longestSideErrorMsg = <div key='longestSideErrorMsg' className='errMessage text-center font-bold text-sm text-red-500'>
      {'Invalid \'Longest Side Resolution\' value. Please update.'}
    </div>;

    errors.push(longestSideErrorMsg);
  }

  const addImageOp = () => {
    const imageOp: ImageOp = {
      identifier,
      isPrivate,
    };

    if (imageFormat !== 'same') {
      imageOp.imageFormat = imageFormat;
    }

    if (longestSideRes.length > 0) {
      const res = Number.parseInt(longestSideRes, 10);
      imageOp.longestSideResolution = res;
    }

    props.addImageOp(imageOp);
  };

  return <div id='addImageOpSection' className='flex justify-center m-2'>
    <div className={`${diffBg} w-full flex justify-center flex-col p-2`}>
      <h1 className='text-lg font-bold text-center'>Add Image Operation</h1>

      <div className={flexBetween}>
        <span className={leftSide}>Identifier</span>
        <TextInput
          value={identifier}
          className={`${rightSide} py-0`}
          onChange={(ev) => {
            setIdentifier(ev.target.value);
          }}/>
      </div>

      <div className={flexBetween}>
        <span className={leftSide}>Private</span>
        <span className={`${rightSide} flex items-center justify-center`}>
          <CheckBox
            startingValue={isPrivate}
            onCheck={(checked: boolean) => {
              setIsPrivate(checked);
            }}/>
        </span>
      </div>

      <div className={flexBetween}>
        <span className={leftSide}>Image Format</span>
        <select
          className={`${rightSide} bg-white dark:bg-slate-800`}
          name='imageFormat'
          id='imageFormat'
          defaultValue={imageFormat}
          onChange={(ev) => {
            setImageFormat(ev.target.value);
          }}>
          <option value='same'>Same</option>
          <option value='png'>PNG</option>
          <option value='jpeg'>JPEG</option>
          <option value='gif'>GIF</option>
          <option value='bmp'>BMP</option>
          <option value='tiff'>TIFF</option>
        </select>
      </div>

      <div className={flexBetween}>
        <span className={leftSide}>Longest Side Resolution</span>
        <TextInput
          value={longestSideRes}
          className={`${rightSide} py-0 ${longestSideResClass}`}
          onChange={async (ev) => {
            const onlyNumbersRegex = /^[0-9]+$/;

            const val = ev.target.value;

            const err =
              ev.target.value !== '' &&
              (Number.isNaN(parseInt(val, 10)) ||
              !onlyNumbersRegex.test(val) ||
              val.slice(0, 1) === '0');

            setLongestSideRes(val);
            setLongestSideResErr(err);
          }}/>
      </div>

      <div className='text-center'>
        <RegularButton
          disabled={errors.length > 0}
          text='Add Image Operation'
          classes={`${dropShadow} dark:bg-red-700`}
          action={addImageOp} />
      </div>

      { errors }

    </div>
  </div>;
}