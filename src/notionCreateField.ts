type FieldType = "title" | "text" | "checkbox" | "date" | "number" | "select";
export interface IData<T> {
  type: FieldType;
  key: keyof T;
  value: any;
}
export default class NotionCreateField<T> {
  private makeTitleField({ key, value }: { key: keyof T; value: string }) {
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
  private makeTextField({ key, value }: { key: keyof T; value: string }) {
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
  private makeCheckboxField({ key, value }: { key: keyof T; value: boolean }) {
    return {
      [key]: {
        checkbox: value,
      },
    };
  }
  private makeNumberField({ key, value }: { key: keyof T; value: number }) {
    return {
      [key]: {
        number: value,
      },
    };
  }
  private makeDateField({ key, value }: { key: keyof T; value: string }) {
    return {
      [key]: {
        date: {
          start: value,
        },
      },
    };
  }
  private makeSelectField({ key, value }: { key: keyof T; value: string }) {
    return {
      [key]: {
        select: {
          name: value,
        },
      },
    };
  }
  private makeField({ type, key, value }: IData<T>) {
    let resultField: { [key: string]: any };
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
  public createProperties(datas: IData<T>[]) {
    return datas.reduce((acc: {} | IData<T>, data: IData<T>) => {
      const field = this.makeField(data);
      acc = { ...acc, ...field };
      return acc;
    }, {});
  }
}
