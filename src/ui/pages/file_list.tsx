import { useEffect, useState } from 'react';
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
import { LinkButton, TrashCanButton } from '@/src/ui/components/icon_buttons';

export function FileListPage() {
  const isLoggedIn = useSelector(selectors.isLoggedIn);
  const dispatch = useDispatch<AppDispatch>();

  const [filesList, setFilesList] = useState<FileDetails[]>([]);

  const [isLoaded, setIsLoaded] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    (async function getFileList() {
      try {
        const result = dispatch(actions.getFileList({}));
        const payload = await result.unwrap();

        const files = payload.files.map((f) => FileDetails.fromJSON(f));
        setFilesList(files);

        setIsLoaded(true);
      } catch (e) {

      }
    })();
  }, [isLoggedIn, dispatch, reloadKey]);

  const onDelete = (id: string) => {
    setReloadKey(reloadKey + 1);
  };

  const content = isLoaded
    ? <FileList files={filesList} onDelete={onDelete} />
    : <CenteredLoadingScreen />;

  return (
    <AuthenticationGuard>
      <StandardPage>
        {content}
      </StandardPage>
    </AuthenticationGuard>
  );
}

interface FileRowProps {
  file: FileDetails;
  onDelete?: (id: string) => void | Promise<void>
}

function FileRow(props: FileRowProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const baseUrl = getApiUrlBase();
  const fileUrl = `${baseUrl}/files/${props.file.filename}`;

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
      const result = dispatch(actions.deleteFiles([props.file.filename]));
      await result.unwrap();
      props.onDelete?.(props.file.filename);
    } catch(e) {
      messengerInstance.addErrorMessage({
        message: 'Error Deleting file',
      });
    }

    setIsDeleting(false);
  };

  const classes = isDeleting ? 'text-red-500 hover:text-red-500 active:text-red-500' : '';

  return <tr>
    <td>
      <a
        href={fileUrl}
        target='_blank'
        className='underline'
        rel="noreferrer">
        {props.file.originalFilename}
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
}

function FileList(props: FileListProps) {
  const rows = props
    .files
    .map((file) => <FileRow
      onDelete={props.onDelete}
      file={file}
      key={file.filename} />);

  return <div>
    <div className='flex flex-col justify-center align-center m-2'>
      <h1 className='text-2xl font-bold'>
        File List
      </h1>

      <table className='filesList table-auto w-full text-sm'>
        <thead className={diffBg}>
          <tr>
            <th colSpan={6}>
              <h1 className='text-lg font-bold'>
                File List
              </h1>
            </th>
          </tr>
          <tr className='tableLeft'>
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