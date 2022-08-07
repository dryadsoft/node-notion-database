export enum EType {
  title = "title",
  text = "text",
  checkbox = "checkbox",
  date = "date",
  number = "number",
  select = "select",
}
export interface IData {
  type: EType;
  key: string;
  value: any;
}

export default class NotionCreateField {
  private makeTitleField({ key, value }: { key: string; value: string }) {
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
  private makeTextField({ key, value }: { key: string; value: string }) {
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
  private makeCheckboxField({ key, value }: { key: string; value: boolean }) {
    return {
      [key]: {
        checkbox: value,
      },
    };
  }
  private makeNumberField({ key, value }: { key: string; value: number }) {
    return {
      [key]: {
        number: value,
      },
    };
  }
  private makeDateField({ key, value }: { key: string; value: string }) {
    return {
      [key]: {
        date: {
          start: value,
        },
      },
    };
  }
  private makeSelectField({ key, value }: { key: string; value: string }) {
    return {
      [key]: {
        select: {
          name: value,
        },
      },
    };
  }
  private makeField({ type, key, value }: IData) {
    let resultField: { [key: string]: any };
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
  public createProperties(datas: IData[]) {
    return datas.reduce((acc: {} | IData, data: IData) => {
      const field = this.makeField(data);
      acc = { ...acc, ...field };
      return acc;
    }, {});
  }
}
