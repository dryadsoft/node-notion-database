"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EType = void 0;
var EType;
(function (EType) {
    EType["title"] = "title";
    EType["text"] = "text";
    EType["checkbox"] = "checkbox";
    EType["date"] = "date";
    EType["number"] = "number";
    EType["select"] = "select";
})(EType = exports.EType || (exports.EType = {}));
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
            case EType.title:
                resultField = this.makeTitleField({ key, value });
                break;
            case EType.text:
                resultField = this.makeTextField({ key, value });
                break;
            case EType.checkbox:
                resultField = this.makeCheckboxField({ key, value });
                break;
            case EType.date:
                resultField = this.makeDateField({ key, value });
                break;
            case EType.number:
                resultField = this.makeNumberField({ key, value });
                break;
            case EType.select:
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