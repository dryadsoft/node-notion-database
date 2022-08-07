import "dotenv/config";
import NotionDatabase from "../src/notionDatabase";
import { EType } from "../src/notionCreateField";

(async () => {
  try {
    const notionDatabase = new NotionDatabase({
      secretKey: String(process.env.SECRET_KEY),
      databaseId: String(process.env.DATABASE_ID),
    });

    // query
    // const queyrResult = await notionDatabase.query();
    // console.log(queyrResult[0]);

    const createResult = await notionDatabase.create([
      { type: EType.title, key: "id", value: "new id" },
      { type: EType.text, key: "description", value: "description update" },
      { type: EType.text, key: "name", value: "name update" },
      { type: EType.checkbox, key: "포스팅여부", value: true },
      { type: EType.date, key: "포스팅날짜", value: "2022-09-01" },
      { type: EType.number, key: "카운트", value: 1163 },
      { type: EType.select, key: "status", value: "In" },
    ]);
    console.log(createResult);
    // const updateResult = await notionDatabase.update({
    //   pageId: "899b9d3a-1f90-48fa-9a00-4643e56ae794",
    //   updateDatas: [
    //     { type: EType.title, key: "id", value: "id update" },
    //     { type: EType.text, key: "description", value: "description update" },
    //     { type: EType.text, key: "name", value: "name update" },
    //     { type: EType.checkbox, key: "포스팅여부", value: true },
    //     { type: EType.date, key: "포스팅날짜", value: "2022-02-01" },
    //     { type: EType.number, key: "카운트", value: 1122263 },
    //     { type: EType.select, key: "status", value: "Inaaa" },
    //   ],
    // });
    // console.log(updateResult);
  } catch (err) {
    console.log(err);
  }
})();
