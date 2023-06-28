import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DateTime } from 'luxon';

import { actions, AppDispatch, selectors } from '@/src/store';
import { getFileSize, shortUnitName } from '@/src/shared/file_size';
import { getApiUrlBase } from '@/src/shared/get_base_url';
import { messengerInstance } from '@/src/shared/messenger';
import { FileDetails } from '@/src/models/file_models';

import { diffBg } from '@/src/ui/components/image_upload/common_themes';
import { AuthenticationGuard } from '@/src/ui/components/navigation_guard';
import { CenteredLoadingScreen, StandardPage } from '@/src/ui/components/standard_page';
import { EditButton, LinkButton, TrashCanButton } from '@/src/ui/components/icon_buttons';
import { CheckBox } from '@/src/ui/components/check_box';
import { RegularButton } from '@/src/ui/components/regular_button';
import { isNullOrUndefined } from '@/src/shared/type_guards';
import { TextInput } from '@/src/ui/components/text_input';
import { UpdateFileRequest } from '@/src/api/file_api';

export function FileListPage() {
  const isLoggedIn = useSelector(selectors.isLoggedIn);
  const dispatch = useDispatch<AppDispatch>();

  const [filesList, setFilesList] = useState<FileDetails[]>([]);

  const [isLoaded, setIsLoaded] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  const getFileList = useCallback(async () => {
    try {
      const result = dispatch(actions.getFileList({}));
      const payload = await result.unwrap();

      const files = payload.files.map((f) => FileDetails.fromJSON(f));
      setFilesList(files);
    } catch (e) {
      messengerInstance.addErrorMessage({
        message: `Error Receiving File List: ${e}`,
      });
    }
  }, [dispatch, setFilesList]);

  const updateFile = async (request: UpdateFileRequest) => {
    const result = await dispatch(actions.updateFile(request));

    await getFileList();
  };

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    (async function getFileListEffect() {
      await getFileList();
      setIsLoaded(true);
    })();
  }, [getFileList, isLoggedIn]);

  const onDelete = (id: string) => {
    setReloadKey(reloadKey + 1);
  };

  if (!isLoaded) {
    return <CenteredLoadingScreen />;
  }

  return (
    <AuthenticationGuard>
      <StandardPage>
      <FileList
        files={filesList}
        onDelete={onDelete}
        updateFile={updateFile}/>
      </StandardPage>
    </AuthenticationGuard>
  );
}

interface FileEditModalProps {
  onCancel: () => void;
  onSave: (request: UpdateFileRequest) => void | Promise<void>;
  fileDetails: FileDetails;
}

function FileEditModal(props: FileEditModalProps) {
  const [newFilename, setNewFilename] = useState(props.fileDetails.filename);
  const [newIsPrivate, setNewIsPrivate] = useState(props.fileDetails.isPrivate);

  const containerClasses = [
    'fixed',
    'w-full',
    'h-full',
    'top-0',
    'left-0',
    'bg-black',
    'bg-opacity-50',
    'z-50',
    'flex',
    'justify-center',
    'items-center',
  ].join(' ');

  const labelClasses = 'mr-4';
  const inputContainerClasses = 'm-2 flex justify-between w-full';

  return <div onClick={props.onCancel} className={containerClasses}>
    <div
      onClick={(e) => e.stopPropagation()}
      className='bg-white p-8 rounded-lg flex flex-col justify-center items-center'>
      <span className={inputContainerClasses}>
        <label className={labelClasses}>Filename</label>
        <TextInput
          onChange={(ev) => setNewFilename(ev.target.value)}
          value={newFilename}/>
      </span>
      <span className={`flex flex-row justify-between ${inputContainerClasses}`}>
        <span className={labelClasses}>Private</span>
        <CheckBox
          startingValue={newIsPrivate}
          onCheck={(checked) => setNewIsPrivate(checked)} />
      </span>

      <div className='flex justify-between w-full mt-6'>
        <RegularButton
          action={() => props.onCancel()}
          text='Cancel'
          classes='mb-0'/>
        <RegularButton
          action={() => props.onSave({
            filename: newFilename,
            isPrivate: newIsPrivate,
            id: props.fileDetails.id,
          })}
          text='Save'
          classes='mb-0'/>
      </div>
    </div>
  </div>;
}

interface FileRowProps {
  file: FileDetails;
  onDelete?: (id: string) => void | Promise<void>
  onEdit?: (id: string) => void | Promise<void>
}

function FileRow(props: FileRowProps) {
  const dispatch = useDispatch<AppDispatch>();

  const [isDeleting, setIsDeleting] = useState(false);

  const baseUrl = getApiUrlBase();
  const fileUrl = `${baseUrl}/files/${props.file.id}`;

  const fileSize = getFileSize(props.file.size);
  const unit = shortUnitName(fileSize.unit);

  const isPrivate = props.file.isPrivate
    ? 'Private'
    : 'Public';

  const dateAdded = DateTime.fromJSDate(props.file.dateAdded);
  const dateString = dateAdded.toLocaleString(DateTime.DATETIME_MED);

  const copyClick = () => {
    navigator.clipboard.writeText(fileUrl);
    messengerInstance.addSuccessMessage({
      message: 'Copied Link to Clipboard',
    });
  };

  const deleteClick = async () => {
    if (isDeleting === true) {
      return;
    }

    setIsDeleting(true);

    try {
      const result = dispatch(actions.deleteFiles([props.file.id]));
      await result.unwrap();
      props.onDelete?.(props.file.id);
    } catch(e) {
      messengerInstance.addErrorMessage({
        message: 'Error Deleting file',
      });
    }

    setIsDeleting(false);
  };

  const editClick = () => {
    props.onEdit?.(props.file.id);
  };

  const classes = isDeleting ? 'text-red-500 hover:text-red-500 active:text-red-500' : '';

  return <tr>
    <td><EditButton onClick={editClick}/></td>
    <td>
      <a
        href={fileUrl}
        target='_blank'
        className='underline'
        rel="noreferrer">
        {props.file.filename}
      </a>
    </td>
    <td>{dateString}</td>
    <td>{`${fileSize.size.toFixed(2)} ${unit}`}</td>
    <td>{isPrivate}</td>
    <td><LinkButton onClick={copyClick} /></td>
    <td><TrashCanButton className={classes} onClick={deleteClick} /></td>
  </tr>;
}

interface FileListProps {
  files: FileDetails[];
  onDelete?: (id: string) => void | Promise<void>;
  updateFile?: (request: UpdateFileRequest) => void | Promise<void>;
}

function FileList(props: FileListProps) {
  const [editingFile, setEditingFile] = useState<string | null>(null);

  const onEdit = (id: string) => {
    setEditingFile(id);
  };

  const rows = props
    .files
    .map((file) => <FileRow
      onEdit={onEdit}
      onDelete={props.onDelete}
      file={file}
      key={file.id} />);

  let fileEditModal: JSX.Element | null = null;

  if (!isNullOrUndefined(editingFile)) {
    const file = props.files.find((f) => f.id === editingFile);

    if (!isNullOrUndefined(file)) {
      const onSave = async (request: UpdateFileRequest) => {
        if (request.filename !== file.filename || request.isPrivate !== file.isPrivate) {
          props.updateFile?.(request);
        }

        setEditingFile(null);
      };

      const onCancel = () => {
        setEditingFile(null);
      };

      fileEditModal = <FileEditModal
        fileDetails={file}
        onSave={onSave}
        onCancel={onCancel} />;
    }
  }

  return <div>
    {fileEditModal}
    <div className='flex flex-col justify-center align-center m-2'>
      <h1 className='text-2xl font-bold'>
        File List
      </h1>

      <table className='filesList table-auto w-full text-sm'>
        <thead className={diffBg}>
          <tr>
            <th colSpan={7}>
              <h1 className='text-lg font-bold'>
                File List
              </h1>
            </th>
          </tr>
          <tr className='tableLeft'>
            <th></th>
            <th>Filename</th>
            <th>Date Added</th>
            <th>File Size</th>
            <th>Private</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  </div>;
}