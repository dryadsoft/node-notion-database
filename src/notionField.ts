interface IDate {
  start: string | null;
  end: string | null;
  time_zone: string | null;
}
export default class NotionField {
  private titleField(title: any[]) {
    return title[0].plain_text;
  }
  private textField(rich_text: any[]) {
    return rich_text[0].plain_text;
  }
  private dateField({ start, end, time_zone }: IDate) {
    return { start, end, time_zone };
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
    let resultField: { [key: string]: any };
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

  public getRows(results: { [key: string]: any }[]) {
    return results.map((row: { [key: string]: any }) => {
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

  public getRow(result: { [key: string]: any }) {
    return {
      pageId: result.id,
      properties: Object.keys(result.properties).reduce((acc, curentKey) => {
        acc = {
          ...acc,
          [curentKey]: this.getField(result.properties[curentKey]),
        };
        return acc;
      }, {}),
    };
  }
}
