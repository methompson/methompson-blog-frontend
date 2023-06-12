import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { CenteredStandardPage } from '@/src/ui/components/standard_page';

import { ImageOp } from '@/src/shared/image_op';
import { messengerInstance } from '@/src/shared/messenger';
import { actions, AppDispatch } from '@/src/store';
import { AuthenticationGuard } from '@/src/ui/components/navigation_guard';

import { DragAndDrop } from '@/src/ui/components/image_upload/drag_and_drop';
import { FileItem } from '@/src/ui/components/image_upload/file_item';
import { FilesTable } from '@/src/ui/components/image_upload/files_table';
import { UploadButton, SubtmittingButton } from '@/src/ui/components/image_upload/upload_button';
import { AddImageOps } from '@/src/ui/components/image_upload/add_image_ops';
import { ImageOpsTable } from '@/src/ui/components/image_upload/image_ops_table';

function Banner() {
  return <div className='flex justify-center m-2'>
    <h1 className='text-2xl font-bold'>
      Image Upload
    </h1>
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

  const showRest = files.length > 0
    ? ''
    : 'hidden';

  return (
    <AuthenticationGuard>
      <CenteredStandardPage>
        <div id='imageUploadContainer' className='my-5'>
          <Banner />
          <DragAndDrop onAddFiles={addFiles}/>
          <span className={showRest}>
            <FilesTable
              files={files}
              deleteFile={deleteFile}/>
            <AddImageOps addImageOp={addImageOp}/>
            <ImageOpsTable imageOps={imageOps} deleteOp={deleteOp}/>
            {uploadButton}
          </span>
        </div>
      </CenteredStandardPage>
    </AuthenticationGuard>
  );
}