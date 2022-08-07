export declare enum EType {
    title = "title",
    text = "text",
    checkbox = "checkbox",
    date = "date",
    number = "number"
}
export interface IData {
    type: EType;
    key: string;
    value: any;
}
export default class NotionCreateField {
    private makeTitleField;
    private makeTextField;
    private makeCheckboxField;
    private makeNumberField;
    private makeDateField;
    private makeField;
    createProperties(datas: IData[]): {};
}
//# sourceMappingURL=notionCreateField.d.ts.map