interface IDateProps {
  start: string | null;
  end: string | null;
  time_zone: string | null;
}
interface ISelectProps {
  id: string;
  name: string;
  color: string;
}
interface ITextProps {
  type: "text";
  text: { content: string; link: string | null };
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string;
  };
  plain_text: string;
  href: string | null;
}

interface IDataProps {
  object: string;
  id: string;
  created_time: string;
  last_edited_time: string;
  created_by: { object: string; id: string };
  last_edited_by: {
    object: string;
    id: string;
  };
  cover: string | null;
  icon: string | null;
  parent: {
    type: string;
    database_id: string;
  };
  archived: boolean;
  properties: {
    [key: string]: any;
  };
  url: string;
  public_url: string | null;
}
export interface IResultProps<T> {
  pageId: string;
  properties: T | { [key: string]: any };
}
export default class NotionField {
  private titleField(title: ITextProps[]) {
    if (!title || title.length === 0) {
      return "";
    }
    return title[0].plain_text;
  }
  private textField(rich_text: ITextProps[]) {
    if (!rich_text || rich_text.length === 0) {
      return "";
    }
    return rich_text[0].plain_text;
  }
  private checkBoxField(prop: boolean): boolean {
    return prop;
  }
  private dateField(props: IDateProps): IDateProps {
    return props;
  }
  private numberField(prop: number): number {
    return prop;
  }
  private selectField(props: ISelectProps) {
    return props;
  }
  private getField({
    type,
    rich_text,
    checkbox,
    date,
    title,
    number,
    select,
  }: any) {
    switch (type) {
      case "title":
        return this.titleField(title);
      case "rich_text":
        return this.textField(rich_text);
      case "checkbox":
        return this.checkBoxField(checkbox);
      case "date":
        return this.dateField(date);
      case "number":
        return this.numberField(number);
      case "select":
        return this.selectField(select);
      default:
        return;
    }
  }

  public getRows<T>(datas: IDataProps[]): IResultProps<T>[] {
    return datas.map((row: IDataProps) => {
      return {
        pageId: row.id,
        properties: Object.keys(row.properties).reduce((acc, curentKey) => {
          acc = {
            ...acc,
            [curentKey]: this.getField(row.properties[curentKey]),
          };
          return acc;
        }, {}),
      };
    });
  }

  public getRow<T>(data: IDataProps): IResultProps<T> {
    return {
      pageId: data.id,
      properties: Object.keys(data.properties).reduce((acc, curentKey) => {
        acc = {
          ...acc,
          [curentKey]: this.getField(data.properties[curentKey]),
        };
        return acc;
      }, {}),
    };
  }
}
