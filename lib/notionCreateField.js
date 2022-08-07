"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NotionCreateField {
    makeTitleField({ key, value }) {
        return {
            [key]: {
                title: [
                    {
                        text: {
                            content: value,
                        },
                    },
                ],
            },
        };
    }
    makeTextField({ key, value }) {
        return {
            [key]: {
                rich_text: [
                    {
                        text: {
                            content: value,
                        },
                    },
                ],
            },
        };
    }
    makeCheckboxField({ key, value }) {
        return {
            [key]: {
                checkbox: value,
            },
        };
    }
    makeNumberField({ key, value }) {
        return {
            [key]: {
                number: value,
            },
        };
    }
    makeDateField({ key, value }) {
        return {
            [key]: {
                date: {
                    start: value,
                },
            },
        };
    }
    makeSelectField({ key, value }) {
        return {
            [key]: {
                select: {
                    name: value,
                },
            },
        };
    }
    makeField({ type, key, value }) {
        let resultField;
        switch (type) {
            case "title":
                resultField = this.makeTitleField({ key, value });
                break;
            case "text":
                resultField = this.makeTextField({ key, value });
                break;
            case "checkbox":
                resultField = this.makeCheckboxField({ key, value });
                break;
            case "date":
                resultField = this.makeDateField({ key, value });
                break;
            case "number":
                resultField = this.makeNumberField({ key, value });
                break;
            case "select":
                resultField = this.makeSelectField({ key, value });
                break;
            default:
                return;
        }
        return resultField;
    }
    createProperties(datas) {
        return datas.reduce((acc, data) => {
            const field = this.makeField(data);
            acc = Object.assign(Object.assign({}, acc), field);
            return acc;
        }, {});
    }
}
exports.default = NotionCreateField;
//# sourceMappingURL=notionCreateField.js.map