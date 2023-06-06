import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { TrashIcon } from '@heroicons/react/solid';

import { CheckBox } from '@/src/ui/components/check_box';
import { TextInput } from '@/src/ui/components/new_post/text_input';
import { RegularButton } from '@/src/ui/components/regular_button';
import { CenteredStandardPage } from '@/src/ui/components/standard_page';

import { ImageOp } from '@/src/shared/image_op';
import { messengerInstance } from '@/src/shared/messenger';
import { isNullOrUndefined } from '@/src/shared/type_guards';
import { actions, AppDispatch } from '@/src/store';

const acceptedImageTypes = [
  'image/png',
  'image/jpeg',
  'image/gif',
  'image/heic',
  'image/bmp',
  'image/tiff',
];

interface FileItem {
  file: File;
  id: string;
}

const diffBg = 'bg-slate-200 dark:bg-slate-700';
const dropShadow = 'ring-1 ring-slate-200 dark:ring-slate-800 shadow-lg dark:shadow-slate-900';

interface TrashCanButtonProps {
  onClick: () => void;
}

function TrashCanButton(props: TrashCanButtonProps) {
  const colorClasses = 'text-slate-900 hover:text-slate-500 active:text-slate-700';
  const darkColorClasses = 'dark:text-slate-300 hover:dark:text-slate-500 dark:active:text-slate-400';
  const sizeClasses = 'h-6 w-6 cursor-pointer';

  const classes = `${colorClasses} ${darkColorClasses} ${sizeClasses}`;

  return <TrashIcon
    className={classes}
    onClick={props.onClick} />;
}

function Banner() {
  return <div className='flex justify-center m-2'>
    <h1 className='text-2xl font-bold'>
      Image Upload
    </h1>
  </div>;
}

interface DragAndDropProps {
  onAddFiles: (files: File[]) => void;
}

function DragAndDrop(props: DragAndDropProps) {
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
      <div className={`${diffBg} ${dropShadow} flex flex-col items-center py-4 px-20 rounded-lg`}>
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

interface FilesTableProps {
  files: FileItem[],
  deleteFile: (id: string) => void
}

function FilesTable(props: FilesTableProps) {
  const fileRows = props.files.map(
    (file) => <FileRow
      key={file.id}
      file={file}
      deleteFile={props.deleteFile}/>);

  return <div id='filesTable' className='flex justify-center m-2 fileTable'>
    <table className='table-auto w-full text-sm'>
      <thead className={diffBg}>
        <tr>
          <th colSpan={3}>
            <h1 className='text-lg font-bold'>
              Files
            </h1>
          </th>
        </tr>
        <tr className='tableLeft'>
          <th>Image Name</th>
          <th>Size</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {fileRows}
      </tbody>
    </table>
  </div>;
}

interface FileRowProps {
  file: FileItem;
  deleteFile: (id: string) => void
}

function FileRow(props: FileRowProps) {
  const size = props.file.file.size;

  let showSize = size / 1024;
  let showUnit = 'KB';

  if (showSize > 1000) {
    showSize = showSize / 1024;
    showUnit = 'MB';

    if (showSize > 1000) {
      showSize = showSize / 1024;
      showUnit = 'GB';
    }
  }

  return <tr>
    <td>{props.file.file.name}</td>
    <td>{`${showSize.toFixed(2)} ${showUnit}`}</td>
    <td><button><TrashCanButton onClick={() => {
      props.deleteFile(props.file.id);
    }} /></button></td>
  </tr>;
}

interface AddImageOpProps {
  addImageOp: (op: ImageOp) => void;
}

function AddImageOps(props: AddImageOpProps) {
  const [identifier, setIdentifier] = useState('');
  const [retainImage, setRetainImage] = useState(false);
  const [imageFormat, setImageFormat] = useState('same');
  const [longestSideRes, setLongestSideRes] = useState('');
  const [longestSideResErr, setLongestSideResErr] = useState(false);
  const [stripMeta, setStripMeta] = useState(false);
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
      retainImage,
      isPrivate,
    };

    if (!retainImage) {
      if (imageFormat !== 'same') {
        imageOp.imageFormat = imageFormat;
      }

      if (longestSideRes.length > 0) {
        const res = Number.parseInt(longestSideRes, 10);
        imageOp.longestSideResolution = res;
      }

      imageOp.stripMetadata = stripMeta;
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
        <span className={leftSide}>Retain Image</span>
        <span className={`${rightSide} flex items-center justify-center`}>
          <CheckBox
            startingValue={retainImage}
            onCheck={(checked: boolean) => {
              setRetainImage(checked);
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
          <option value='heic'>HEIC</option>
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

      <div className={flexBetween}>
        <span className={leftSide}>Strip Metadata</span>
        <span className={`${rightSide} flex items-center justify-center`}>
          <CheckBox
            startingValue={stripMeta}
            onCheck={(checked: boolean) => {
              setStripMeta(checked);
            }}/>
        </span>
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

interface ImageOpsTableProps {
  imageOps: Record<string, ImageOp>;
  deleteOp: (identifier: string) => void;
}

function ImageOpsTable(props: ImageOpsTableProps) {
  const opRows = Object.values(props.imageOps).map(
    (op) => <OpRow
      imageOp={op}
      deleteOp={props.deleteOp}
      key={op.identifier} />,
  );

  return <div className='flex justify-center m-2 imageOpTable'>
    <table className='table-auto w-full text-sm'>
      <thead className={diffBg}>
        <tr>
          <th colSpan={6}>
            <h1 className='text-lg font-bold'>
              Image Operations
            </h1>
          </th>
        </tr>
        <tr className='tableLeft'>
          <th>Identifier</th>
          <th>Retain Image</th>
          <th>Image Format</th>
          <th>Longest Side Resolution</th>
          <th>Strip Metadata</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {opRows}
      </tbody>
    </table>
  </div>;
}

interface OpRowProps {
  imageOp: ImageOp;
  deleteOp: (identifier: string) => void;
}

function OpRow(props: OpRowProps) {
  const op = props.imageOp;

  const tfText = (input: boolean | undefined): string => {
     if (isNullOrUndefined(input)) {
      return 'N/A';
     }

     return input ? 'True' : 'False';
  };

  return <tr>
    <td>{op.identifier}</td>
    <td>{tfText(op.retainImage)}</td>
    <td>{op.imageFormat ? op.imageFormat : 'N/A'}</td>
    <td>{op.longestSideResolution ? op.longestSideResolution : 'N/A'}</td>
    <td>{tfText(op.stripMetadata)}</td>
    <td><TrashCanButton onClick={() => props.deleteOp(op.identifier)}/></td>
  </tr>;
}

interface UploadButtonProps {
  action: () => Promise<void>;
  enabled: boolean;
}

function UploadButton(props: UploadButtonProps) {
  return <div id='uploadingButton' className='text-center'>
    <RegularButton
      disabled={!props.enabled}
      text='Upload Images'
      classes={`${dropShadow} text-xl font-bold`}
      action={props.action} />
  </div>;
}

function SubtmittingButton() {
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

function SuccessMessage(props: {successUrl: string}) {
  return <span>Message Created! See here: <a href={props.successUrl}>Link</a> </span>;
}

export function ImageUploadPage() {
  const dispatch = useDispatch<AppDispatch>();

  const [files, setFiles] = useState<FileItem[]>([]);
  const [imageOps, setImageOps] = useState<Record<string, ImageOp>>({});
  const [submitting, setSubmitting] = useState<boolean>(false);

  function addFiles(fileList: File[]) {
    const fileItems = fileList.map((file) => ({
      file,
      id: uuidv4(),
    }));

    setFiles([
      ...files,
      ...fileItems,
    ]);
  }

  function deleteFile(id: string) {
    const newFiles = files.filter((file) => file.id !== id);
    setFiles(newFiles);
  }

  function addImageOp(imageOp: ImageOp) {
    imageOps[imageOp.identifier] = imageOp;
    setImageOps({...imageOps});
  }

  function deleteOp(identifier: string) {
    const ops = {...imageOps};
    delete ops[identifier];
    setImageOps(ops);
  }

  async function uploadImages() {

    const ops = Object.values(imageOps);
    const fileList = files.map((f) => f.file);

    // TODOs:
    // Show message with error or success
    // Show information about image, including link to image.

    setSubmitting(true);

    try {
      await dispatch(actions.uploadImages({
        files: fileList,
        ops,
      }));

      // await new Promise((resolve) => {
      //   setTimeout(resolve, 1000);
      // });

      let successMessage = <SuccessMessage successUrl='/' />;

      messengerInstance.addSuccessMessage({
        message: successMessage,
        // duration: new Duration({minutes: 10}),
      });
    } catch(e) {
      messengerInstance.addErrorMessage({
        message: `Error Uploading Images: ${e}`,
      });
    }

    setSubmitting(false);
  }

  let uploadButton = <SubtmittingButton />;

  if (!submitting) {

    const enabled = files.length > 0 && Object.keys(imageOps).length > 0;
    uploadButton = <UploadButton action={uploadImages} enabled={enabled}/>;
  }

  return (
    <CenteredStandardPage authRestricted={true}>
      <div id='imageUploadContainer' className='my-5'>
        <Banner />
        <DragAndDrop onAddFiles={addFiles}/>
        <FilesTable
          files={files}
          deleteFile={deleteFile}/>
        <AddImageOps addImageOp={addImageOp}/>
        <ImageOpsTable imageOps={imageOps} deleteOp={deleteOp}/>
        {uploadButton}
      </div>
    </CenteredStandardPage>
  );
}