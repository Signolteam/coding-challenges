type Cell = {
    value: string
}
type formatterFn = (str: string) => string;

export default (formatter: formatterFn) => ({ value }: Cell) => <>{formatter(value)}</>;