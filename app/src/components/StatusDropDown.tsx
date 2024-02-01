import { TaskStatus } from "../models/Task.type"

type Props = {
    value: TaskStatus;
    onValueChangedHandler: (status: TaskStatus) => void;
}

const StatusDropdown = (props: Props) => {
    const { value, onValueChangedHandler } = props;

    const renderOption = (text: string) => {
        return <option key={text}>{text}</option>
    }
  
    const options = Object.values(TaskStatus).map((value: string) => value);
  
    return (
      <select value={value} onChange={(e) => onValueChangedHandler(e.target.value as TaskStatus)}>{options.map((text) => renderOption(text))}</select>
    )
  }
  
  export default StatusDropdown;