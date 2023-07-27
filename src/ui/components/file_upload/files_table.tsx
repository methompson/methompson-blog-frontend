import { FileItem } from '@/src/models/file_item';
import { CheckBox } from '@/src/ui/components/check_box';
import { diffBg } from '@/src/ui/components/file_upload/common_themes';
import { TrashCanButton } from '@/src/ui/components/icon_buttons';
import { isNullOrUndefined } from '@/src/shared/type_guards';

interface FileRowProps {
  file: FileItem;
  deleteFile: (id: string) => void;
  setPrivate?: (id: string, isPrivate: boolean) => void;
  showPrivate: boolean;
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

  const privateCheck = props.showPrivate && props.setPrivate ?
    <td>
      <CheckBox
        startingValue={props.file.private ?? true}
        onCheck={(checked: boolean) => {
          props.setPrivate?.(props.file.id, checked);
        }}/>
    </td>
    : null;

  return <tr>
    <td>{props.file.file.name}</td>
    <td>{`${showSize.toFixed(2)} ${showUnit}`}</td>
    {privateCheck}
    <td><button><TrashCanButton onClick={() => {
      props.deleteFile(props.file.id);
    }} /></button></td>
  </tr>;
}

interface FilesTableProps {
  files: FileItem[],
  deleteFile: (id: string) => void
  setPrivate?: (id: string, isPrivate: boolean) => void;
  showPrivate?: boolean;
}

export function FilesTable(props: FilesTableProps) {
  const showPrivate = props.showPrivate === true && !isNullOrUndefined(props.setPrivate);

  const fileRows = props.files.map(
    (file) => <FileRow
      showPrivate={showPrivate}
      setPrivate={props.setPrivate}
      key={file.id}
      file={file}
      deleteFile={props.deleteFile}/>);

  const privateColumn = showPrivate ?
    <th>Private</th> :
    null;

  const colSpan = showPrivate ? 4 : 3;

  return <div id='filesTable' className='flex justify-center m-2 fileTable'>
    <table className='table-auto w-full text-sm'>
      <thead className={diffBg}>
        <tr>
          <th colSpan={colSpan}>
            <h1 className='text-lg font-bold'>
              Files
            </h1>
          </th>
        </tr>
        <tr className='tableLeft'>
          <th>File Name</th>
          <th>Size</th>
          {privateColumn}
          <th></th>
        </tr>
      </thead>
      <tbody>
        {fileRows}
      </tbody>
    </table>
  </div>;
}