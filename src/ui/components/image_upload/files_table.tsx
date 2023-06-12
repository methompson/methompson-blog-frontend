import { diffBg, dropShadow } from '@/src/ui/components/image_upload/common_themes';
import { FileItem } from '@/src/ui/components/image_upload/file_item';
import { TrashCanButton } from '@/src/ui/components/image_upload/trash_can_button';

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

interface FilesTableProps {
  files: FileItem[],
  deleteFile: (id: string) => void
}

export function FilesTable(props: FilesTableProps) {
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