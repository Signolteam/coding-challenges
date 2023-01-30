import taskStore from '@/state/Tasks';
import { observer } from 'mobx-react-lite';
import ClearDataButton from '@/components/common/ClearDataButton';
import FileUploadButton from  '@/components/common/FileUploadButton';

export default observer(() => {
    const hasTasks = Object.keys(taskStore).length > 0;

    return (
        <div className='flex gap-8'>
            { hasTasks && <ClearDataButton /> }
            <FileUploadButton />
        </div>
    );
})

