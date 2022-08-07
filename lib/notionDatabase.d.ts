import { IData } from "./notionCreateField";
interface INotionDatabase {
    secretKey: string;
    databaseId: string;
    notionVersion?: string;
}
interface IUpdate {
    pageId: string;
    updateDatas: IData[];
}
export default class NotionDatabase {
    private BASE_URL;
    private secretKey;
    private databaseId;
    private notionVersion;
    private notionCreateField;
    private notionField;
    constructor({ secretKey, databaseId, notionVersion, }: INotionDatabase);
    private createHeaders;
    query(): Promise<{}[]>;
    create(newDatas: IData[]): Promise<any>;
    update({ pageId, updateDatas }: IUpdate): Promise<any>;
}
export {};
//# sourceMappingURL=notionDatabase.d.ts.map