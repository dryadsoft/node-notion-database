"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NotionField {
    titleField(title) {
        return title[0].plain_text;
    }
    textField(rich_text) {
        return rich_text[0].plain_text;
    }
    dateField({ start, end, time_zone }) {
        return { start, end, time_zone };
    }
    getField({ type, rich_text, checkbox, date, title, number, select, }) {
        let resultField;
        switch (type) {
            case "title":
                resultField = this.titleField(title);
                break;
            case "rich_text":
                resultField = this.textField(rich_text);
                break;
            case "checkbox":
                resultField = checkbox;
                break;
            case "date":
                resultField = this.dateField(date);
                break;
            case "number":
                resultField = number;
                break;
            case "select":
                resultField = select;
                break;
            default:
                return;
        }
        return resultField;
    }
    getRows(results) {
        return results.map((row) => {
            return {
                pageId: row.id,
                properties: Object.keys(row.properties).reduce((acc, curentKey) => {
                    acc = Object.assign(Object.assign({}, acc), { [curentKey]: this.getField(row.properties[curentKey]) });
                    return acc;
                }, {}),
            };
        });
    }
    getRow(result) {
        return {
            pageId: result.id,
            properties: Object.keys(result.properties).reduce((acc, curentKey) => {
                acc = Object.assign(Object.assign({}, acc), { [curentKey]: this.getField(result.properties[curentKey]) });
                return acc;
            }, {}),
        };
    }
}
exports.default = NotionField;
//# sourceMappingURL=notionField.js.map