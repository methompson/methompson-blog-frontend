import { ImageOp } from '@/src/shared/image_op';
import { isNullOrUndefined } from '@/src/shared/type_guards';
import { diffBg } from '@/src/ui/components/file_upload/common_themes';
import { TrashCanButton } from '@/src/ui/components/icon_buttons';

interface ImageOpsTableProps {
  imageOps: Record<string, ImageOp>;
  deleteOp: (identifier: string) => void;
}

export function ImageOpsTable(props: ImageOpsTableProps) {
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
          <th colSpan={5}>
            <h1 className='text-lg font-bold'>
              Image Operations
            </h1>
          </th>
        </tr>
        <tr className='tableLeft'>
          <th>Identifier</th>
          <th>Is Private</th>
          <th>Image Format</th>
          <th>Longest Side Resolution</th>
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
    <td>{tfText(op.isPrivate)}</td>
    <td>{op.imageFormat ? op.imageFormat : 'N/A'}</td>
    <td>{op.longestSideResolution ? op.longestSideResolution : 'N/A'}</td>
    <td><TrashCanButton onClick={() => props.deleteOp(op.identifier)}/></td>
  </tr>;
}