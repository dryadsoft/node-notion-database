"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const notionCreateField_1 = __importDefault(require("./notionCreateField"));
const notionField_1 = __importDefault(require("./notionField"));
class NotionDatabase {
    constructor({ secretKey, databaseId, notionVersion = "2021-05-13", }) {
        this.BASE_URL = "https://api.notion.com/v1";
        this.secretKey = secretKey;
        this.databaseId = databaseId;
        this.notionVersion = notionVersion;
        this.notionCreateField = new notionCreateField_1.default();
        this.notionField = new notionField_1.default();
    }
    createHeaders() {
        return {
            Authorization: `Bearer ${this.secretKey}`,
            "Notion-Version": this.notionVersion,
            "Content-Type": "application/json",
        };
    }
    query() {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, node_fetch_1.default)(`${this.BASE_URL}/databases/${this.databaseId}/query`, {
                method: "POST",
                headers: this.createHeaders(),
                body: JSON.stringify({}),
            })
                .then((res) => res.json())
                .then((json) => this.notionField.getRows(json.results));
        });
    }
    create(newDatas) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, node_fetch_1.default)(`${this.BASE_URL}/pages/`, {
                method: "POST",
                headers: this.createHeaders(),
                body: JSON.stringify({
                    parent: {
                        database_id: this.databaseId,
                    },
                    properties: this.notionCreateField.createProperties(newDatas),
                }),
            })
                .then((res) => res.json())
                .then((json) => this.notionField.getRow(json));
        });
    }
    update({ pageId, updateDatas }) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, node_fetch_1.default)(`${this.BASE_URL}/pages/${pageId}`, {
                method: "PATCH",
                headers: this.createHeaders(),
                body: JSON.stringify({
                    properties: this.notionCreateField.createProperties(updateDatas),
                }),
            })
                .then((res) => res.json())
                .then((json) => this.notionField.getRow(json));
        });
    }
}
exports.default = NotionDatabase;
//# sourceMappingURL=notionDatabase.js.map