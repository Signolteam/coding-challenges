import { getTasks } from '@/api';

export default function FileUploadButton () {
    return (
        <button onClick={getTasks}>
            UPLOAD FILE
        </button>
    );
}