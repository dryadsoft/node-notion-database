import fetch from "node-fetch";
import NotionCreateField, { IData } from "./notionCreateField";
import NotionField from "./notionField";
interface INotionDatabase {
  secretKey: string;
  databaseId: string;
  notionVersion?: string;
}
interface IQuery {
  filter?: { [key: string]: any };
  sorts?: { [key: string]: any }[];
}
interface IUpdate {
  pageId: string;
  updateDatas: IData[];
}
export default class NotionDatabase {
  private BASE_URL = "https://api.notion.com/v1";
  private secretKey: string;
  private databaseId: string;
  private notionVersion: string;
  private notionCreateField: NotionCreateField;
  private notionField: NotionField;
  constructor({
    secretKey,
    databaseId,
    notionVersion = "2021-05-13",
  }: INotionDatabase) {
    this.secretKey = secretKey;
    this.databaseId = databaseId;
    this.notionVersion = notionVersion;
    this.notionCreateField = new NotionCreateField();
    this.notionField = new NotionField();
  }

  private createHeaders() {
    return {
      Authorization: `Bearer ${this.secretKey}`,
      "Notion-Version": this.notionVersion,
      "Content-Type": "application/json",
    };
  }

  async query({ filter, sorts }: IQuery) {
    return fetch(`${this.BASE_URL}/databases/${this.databaseId}/query`, {
      method: "POST",
      headers: this.createHeaders(),
      body: JSON.stringify({
        filter: filter && {
          ...filter,
        },
        sorts: sorts && [...sorts],
      }),
    })
      .then((res) => res.json())
      .then((json) => this.notionField.getRows(json.results));
  }

  async create(newDatas: IData[]) {
    return fetch(`${this.BASE_URL}/pages/`, {
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
  }

  async update({ pageId, updateDatas }: IUpdate) {
    return fetch(`${this.BASE_URL}/pages/${pageId}`, {
      method: "PATCH",
      headers: this.createHeaders(),
      body: JSON.stringify({
        properties: this.notionCreateField.createProperties(updateDatas),
      }),
    })
      .then((res) => res.json())
      .then((json) => this.notionField.getRow(json));
  }
}
