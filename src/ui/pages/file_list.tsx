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
import { LinkButton, TrashCanButton } from '@/src/ui/components/image_upload/icon_buttons';

export function FileListPage() {
  const isLoggedIn = useSelector(selectors.isLoggedIn);
  const dispatch = useDispatch<AppDispatch>();

  const [filesList, setFilesList] = useState<FileDetails[]>([]);
  // const [totalFiles, setTotalFiles] = useState(0);
  // const [page, setPage] = useState(0);
  // const [pagination, setPagination] = useState(0);

  // const [filesListResponse, setFilesListResponse] = useState<FileListResponse | undefined>(undefined);
  const [isLoaded, setIsLoaded] = useState(false);

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

        // setTotalFiles(payload.totalFiles);
        // setPage(payload.page);
        // setPagination(payload.pagination);

        // setFilesListResponse(payload);

        setIsLoaded(true);
      } catch (e) {

      }
    })();
  }, [isLoggedIn, dispatch]);

  const content = isLoaded
    ? <FileList files={filesList} />
    : <CenteredLoadingScreen />;

  return (
    <AuthenticationGuard>
      <StandardPage>
        {content}
      </StandardPage>
    </AuthenticationGuard>
  );
}

function FileRow(props: { file: FileDetails }) {
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

  const deleteClick = () => {};

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
    <td><TrashCanButton onClick={deleteClick} /></td>
  </tr>;
}

function FileList(props: { files: FileDetails[] }) {
  const rows = props
    .files
    .map((file) => <FileRow
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