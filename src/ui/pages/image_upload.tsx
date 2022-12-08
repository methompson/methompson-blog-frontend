import { TrashIcon } from '@heroicons/react/solid';

import { CenteredStandardPage } from '@/src/ui/components/standard_page';
import { RegularButton } from '@/src/ui/components/regular_button';
import { TextInput } from '@/src/ui/components/new_post/text_input';
import { CheckBox } from '@/src/ui/components/check_box';

export function ImageUpload() {
  /*
    Banner
    Drag and drop area
    Add File Area

    Files Table
    Add Image Op Section

    Image operations table
  */
  return (
    <CenteredStandardPage authRestricted={true}>
      <Banner />
      <DragAndDrop />
      <AddFileButton />
      <FilesTable />
      <AddImageOps />
      <ImageOpsTable />
    </CenteredStandardPage>
  );
}

const diffBg = 'bg-slate-200 dark:bg-slate-700';
const dropShadow = 'ring-1 ring-slate-200 dark:ring-slate-800 shadow-lg dark:shadow-slate-900';

function TrashCanButton() {
  return <TrashIcon className='h-6 w-6' />;
}

function Banner() {
  return <div className='flex justify-center m-2'>
    <h1 className='text-2xl font-bold'>
      Image Upload
    </h1>
  </div>;
}

function DragAndDrop() {
  return <div className='flex justify-center'>
    <div className={`${diffBg} ${dropShadow} flex flex-col items-center py-4 px-20 m-2 rounded-lg`}>
      <span>Drag And Drop</span>
      <span>or</span>
      <span>Hit Add File</span>
    </div>
  </div>;
}

function AddFileButton() {
  return <div className='flex justify-center m-2'>
    <RegularButton
      text='Add File'
      classes={`${dropShadow} dark:bg-red-700`}
      action={() => {}} />
  </div>;
}

function FilesTable() {
  return <div className='flex justify-center m-2 fileTable'>
    <table className='table-auto w-full'>
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
        <tr>
          <td>image1.jpg</td>
          <td>384 kb</td>
          <td><button><TrashCanButton /></button></td>
        </tr>
        <tr>
          <td>image2.png</td>
          <td>112 kb</td>
          <td><button><TrashCanButton /></button></td>
        </tr>
        <tr>
          <td>image3.heic</td>
          <td>1,292 kb</td>
          <td><button><TrashCanButton /></button></td>
        </tr>
      </tbody>
    </table>
  </div>;
}

function AddImageOps() {
  const flexBetween = 'flex flex-row justify-between items-center py-2';
  const leftSide = 'w-2/3';
  const rightSide = 'w-1/3';

  return <div className='flex justify-center m-2'>
    <div className={`${diffBg} w-full flex justify-center m-2 flex-col p-2`}>
      <h1 className='text-lg font-bold'>Add Image Operation</h1>

      <div className={flexBetween}>
        <span className={leftSide}>Identifier</span>
        <TextInput
          value=''
          className={`${rightSide} py-0`}
          onChange={() => {}}/>
      </div>

      <div className={flexBetween}>
        <span className={leftSide}>Retain Image</span>
        <span className={`${rightSide} flex items-center justify-center`}>
          <CheckBox
            onCheck={(checked: boolean) => {
              console.log('CLICK!', checked);
            }}/>
        </span>
      </div>

      <div className={flexBetween}>
        <span className={leftSide}>Image Format</span>
        <select
          className={`${rightSide} bg-white dark:bg-slate-800`}
          name='imageFormat'
          id='imageFormat'>
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
          value=''
          className={`${rightSide} py-0`}
          onChange={() => {}}/>
      </div>

      <div className={flexBetween}>
        <span className={leftSide}>Strip Metadata</span>
        <span className={`${rightSide} flex items-center justify-center`}>
          <CheckBox
            onCheck={(checked: boolean) => {
              console.log('CLICK!', checked);
            }}/>
        </span>
      </div>

      <div className='text-center'>
        <RegularButton
          text='Add Image Operation'
          classes={`${dropShadow} dark:bg-red-700`}
          action={() => {}} />
      </div>

    </div>
  </div>;
}

function ImageOpsTable() {
  return <div className='flex justify-center m-2 imageOpTable'>
    <table className='table-auto w-full'>
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
        <tr>
          <td>web</td>
          <td>False</td>
          <td>Jpeg</td>
          <td>1280</td>
          <td>True</td>
          <td><TrashCanButton /></td>
        </tr>
        <tr>
          <td>thumn</td>
          <td>False</td>
          <td>Jpeg</td>
          <td>128</td>
          <td>True</td>
          <td><TrashCanButton /></td>
        </tr>
        <tr>
          <td>original</td>
          <td>True</td>
          <td>N/A</td>
          <td>N/A</td>
          <td>N/A</td>
          <td><TrashCanButton /></td>
        </tr>
      </tbody>
    </table>
  </div>;
}