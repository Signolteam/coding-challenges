import CSVReader from 'react-csv-reader';
import { validateTaskArray } from '../../utils/validation';
import type Task from '../../models/Task';
import TaskAPI from '../../utils/TaskAPI';

type Props = {
  loadingCSV: boolean;
  setLoadingCSV: (loadingCSV: boolean) => void;
  setErrorMessage: (errorMessage: string | null) => void;
  fetchTasks: () => void;
}

export default function TaskCSVReader({
  loadingCSV, setLoadingCSV, setErrorMessage, fetchTasks} : Props) {
  const CSVErrorMessage = 'There was a problem loading your CSV';
  const onFileLoaded = async (
      data: Task[], fileInfo: any, originalFile: any) => {
    setLoadingCSV(true);
    setErrorMessage(null);

    const validationErrors = validateTaskArray(data);
    if (!validationErrors) {
      const uploadSuccesful = await TaskAPI.createTasks(data);
      if (!uploadSuccesful) {
        setErrorMessage(CSVErrorMessage);
        setLoadingCSV(false);
        return;
      };
      await fetchTasks();
      setLoadingCSV(false);
      return;
    }

    // In a real app this should be the main kind of error a user sees,
    // with clientside validation catching ALL known user-errors
    // (in this case some details are missing from my validation schema)
    setErrorMessage(`${CSVErrorMessage}: ${validationErrors[0]?.message}!`);
    setLoadingCSV(false);
  };

  return (
    <CSVReader
      cssClass={
        loadingCSV ?
        "upload-button-wrapper spinner uploading"
        :"upload-button-wrapper"}
      cssLabelClass={"button"}
      label={loadingCSV ? "" : "Upload CSV"}
      disabled={loadingCSV}
      strict
      inputStyle={{display: 'none'}}
      onFileLoaded={onFileLoaded}
      onError={(error) => {
        console.error(error);
        setErrorMessage(CSVErrorMessage);
      }}
      parserOptions={{
        skipEmptyLines: 'greedy',
        header: true,
        transformHeader: (header: string) => {
          switch(header) {
            case 'company_name': {
              return 'companyName';
            }
            case 'task_owner': {
              return 'createdBy';
            }
            case 'task_date': {
              return 'date';
            }
            case 'task_description': {
              return 'description';
            }
            case 'task_status': {
              return 'status';
            }
            default: {
              return header;
            }
          }
        }
      }}
  />);
}
