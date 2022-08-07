declare type FieldType = "title" | "text" | "checkbox" | "date" | "number" | "select";
export interface IData {
    type: FieldType;
    key: string;
    value: any;
}
export default class NotionCreateField {
    private makeTitleField;
    private makeTextField;
    private makeCheckboxField;
    private makeNumberField;
    private makeDateField;
    private makeSelectField;
    private makeField;
    createProperties(datas: IData[]): {};
}
export {};
//# sourceMappingURL=notionCreateField.d.ts.map