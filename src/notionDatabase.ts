import fetch from "node-fetch";
import NotionCreateField, { IData } from "./notionCreateField";
import NotionField, { IResultProps } from "./notionField";
interface INotionDatabaseProps {
  secretKey: string;
  databaseId: string;
  notionVersion?: string;
}
interface IQueryProps {
  filter?: { [key: string]: any };
  sorts?: { [key: string]: any }[];
}
interface IUpdateProps<T> {
  pageId: string;
  updateDatas: IData<T>[];
}
export default class NotionDatabase<T extends {}> {
  private readonly BASE_URL = "https://api.notion.com/v1";
  private readonly secretKey: string;
  private readonly databaseId: string;
  private readonly notionVersion: string;
  private readonly notionCreateField: NotionCreateField<T>;
  private readonly notionField: NotionField;
  constructor({
    secretKey,
    databaseId,
    notionVersion = "2021-05-13",
  }: INotionDatabaseProps) {
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

  async query(props?: IQueryProps): Promise<IResultProps<T>[]> {
    return fetch(`${this.BASE_URL}/databases/${this.databaseId}/query`, {
      method: "POST",
      headers: this.createHeaders(),
      body: JSON.stringify({
        filter: props?.filter && {
          ...props.filter,
        },
        sorts: props?.sorts && [...props.sorts],
      }),
    })
      .then((res) => res.json())
      .then((json) => this.notionField.getRows<T>(json.results));
  }

  async create(newDatas: IData<T>[]): Promise<IResultProps<T>> {
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
      .then((json) => this.notionField.getRow<T>(json));
  }

  async update({
    pageId,
    updateDatas,
  }: IUpdateProps<T>): Promise<IResultProps<T>> {
    return fetch(`${this.BASE_URL}/pages/${pageId}`, {
      method: "PATCH",
      headers: this.createHeaders(),
      body: JSON.stringify({
        properties: this.notionCreateField.createProperties(updateDatas),
      }),
    })
      .then((res) => res.json())
      .then((json) => this.notionField.getRow<T>(json));
  }
}
