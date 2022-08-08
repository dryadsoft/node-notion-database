# node-notion-database

[![npm version](https://img.shields.io/npm/v/node-notion-database.svg?style=flat-square)](https://www.npmjs.org/package/node-notion-database)
[![npm downloads](https://img.shields.io/npm/dm/node-notion-database.svg?style=flat-square)](http://npm-stat.com/charts.html?package=node-notion-database)

npm 사용:

```bash
$ npm i node-notion-database
```

yarn 사용:

```bash
$ yarn add node-notion-database
```

## 예제(usage)

```typescript
import NotionDatabase from "notionDatabase";

const notionDatabase = new NotionDatabase({
  secretKey: "Your notion Secret Key",
  databaseId: "Your notion Database Id",
});

// query
const queyrResult = await notionDatabase.query();

//create
const createResult = await notionDatabase.create([
  { type: "title", key: "id", value: "new id" },
  { type: "text", key: "description", value: "description update" },
  { type: "text", key: "name", value: "name update" },
  { type: "checkbox", key: "포스팅여부", value: true },
  { type: "date", key: "포스팅날짜", value: "2022-09-01" },
  { type: "number", key: "카운트", value: 1163 },
  { type: "select", key: "status", value: "In" },
]);

// update
const updateResult = await notionDatabase.update({
  pageId: "your page_id",
  updateDatas: [
    { type: "title", key: "id", value: "id update" },
    { type: "text", key: "description", value: "description update" },
    { type: "text", key: "name", value: "name update" },
    { type: "checkbox", key: "포스팅여부", value: true },
    { type: "date", key: "포스팅날짜", value: "2022-02-01" },
    { type: "number", key: "카운트", value: 1122263 },
    { type: "select", key: "status", value: "Inaaa" },
  ],
});
```

## Resources

- [CHANGELOG](https://github.com/dryadsoft/node-notion-database/blob/master/CHANGELOG.md)

## License

[MIT](LICENSE)
