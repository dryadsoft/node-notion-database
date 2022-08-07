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
import { EType } from "notionCreateField";

const notionDatabase = new NotionDatabase({
  secretKey: "Your notion Secret Key",
  databaseId: "Your notion Database Id",
});

// query
const queyrResult = await notionDatabase.query();

//create
const createResult = await notionDatabase.create([
  { type: EType.title, key: "id", value: "new id" },
  { type: EType.text, key: "description", value: "description update" },
  { type: EType.text, key: "name", value: "name update" },
  { type: EType.checkbox, key: "포스팅여부", value: true },
  { type: EType.date, key: "포스팅날짜", value: "2022-09-01" },
  { type: EType.number, key: "카운트", value: 1163 },
  { type: EType.select, key: "status", value: "In" },
]);

// update
const updateResult = await notionDatabase.update({
  pageId: "your page_id",
  updateDatas: [
    { type: EType.title, key: "id", value: "id update" },
    { type: EType.text, key: "description", value: "description update" },
    { type: EType.text, key: "name", value: "name update" },
    { type: EType.checkbox, key: "포스팅여부", value: true },
    { type: EType.date, key: "포스팅날짜", value: "2022-02-01" },
    { type: EType.number, key: "카운트", value: 1122263 },
    { type: EType.select, key: "status", value: "Inaaa" },
  ],
});
```
