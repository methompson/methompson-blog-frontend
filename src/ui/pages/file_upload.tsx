import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { DragAndDrop } from '@/src/ui/components/file_upload/drag_and_drop';
import { FilesTable } from '@/src/ui/components/file_upload/files_table';
import { SubtmittingButton, UploadButton } from '@/src/ui/components/file_upload/upload_button';
import { AuthenticationGuard } from '@/src/ui/components/navigation_guard';
import { CenteredStandardPage } from '@/src/ui/components/standard_page';

import { FileOp } from '@/src/api/file_api';
import { FileItem } from '@/src/models/file_item';
import { arrayToMap } from '@/src/shared/array_to_map';
import { messengerInstance } from '@/src/shared/messenger';
import { actions, AppDispatch } from '@/src/store';
import { Link } from 'react-router-dom';

function Banner() {
  return <div className='flex justify-center m-2'>
    <h1 className='text-2xl font-bold'>
      File Upload
    </h1>
  </div>;
}

export function FileUpload() {
  const dispatch = useDispatch<AppDispatch>();

  const [files, setFiles] = useState<Record<string | number, FileItem>>({});
  const [submitting, setSubmitting] = useState<boolean>(false);

  function clearFiles() {
    setFiles({});
  }

  function addFiles(fileList: File[]) {
    const fileItems: FileItem[] = fileList.map((file) => ({
      file,
      id: uuidv4(),
    }));

    const fileMap = arrayToMap(fileItems, (fileItem) => fileItem.id);

    setFiles({
      ...files,
      ...fileMap,
    });
  }

  function deleteFile(id: string) {
    const newFiles = {...files};
    delete newFiles[id];
    setFiles(newFiles);
  }

  function setPrivate(id: string, isPrivate: boolean) {
    const file = files[id];
    if (!file) {
      return;
    }

    const newFile: FileItem = {
      ...file,
      private: isPrivate,
    };

    const newFiles = {
      ...files,
      [id]: newFile,
    };

    setFiles(newFiles);
  }

  async function uploadFiles() {
    setSubmitting(true);

    const fileOps: Record<string, FileOp> = {};
    for (const file of Object.values(files)) {
      fileOps[file.file.name] = {
        isPrivate: file.private ?? true,
      };
    }

    const filesToUpload = Object.values(files).map((file) => file.file);

    try {
      await dispatch(actions.uploadFiles({
        files: filesToUpload,
        fileOps,
      }));

      messengerInstance.addSuccessMessage({
        message: <span>Files Uploaded Successfully. <Link to='/files'>See your file list</Link></span>,
      });

      clearFiles();

    } catch (e) {
      messengerInstance.addErrorMessage({
        message: `Error Uploading files: ${e}`,
      });
    }

    setSubmitting(false);
  }

  let uploadButton = <SubtmittingButton />;

  if (!submitting) {
    const enabled = Object.values(files).length > 0;
    uploadButton = <UploadButton action={uploadFiles} enabled={enabled}/>;
  }

  const showRest = Object.values(files).length > 0
    ? ''
    : 'hidden';

  return (
    <AuthenticationGuard>
      <CenteredStandardPage>
        <div id='fileUploadContainer' className='my-5'>
          <Banner />
          <DragAndDrop
            onAddFiles={addFiles} />
          <span className={showRest}>
            <FilesTable
              showPrivate={true}
              setPrivate={setPrivate}
              files={Object.values(files)}
              deleteFile={deleteFile}/>
              {uploadButton}
          </span>
        </div>
      </CenteredStandardPage>
    </AuthenticationGuard>
  );
}