export default class NotionField {
    private titleField;
    private textField;
    private dateField;
    private getField;
    getRows(results: {
        [key: string]: any;
    }[]): {
        pageId: any;
        properties: {};
    }[];
    getRow(result: {
        [key: string]: any;
    }): {
        pageId: any;
        properties: {};
    };
}
//# sourceMappingURL=notionField.d.ts.map