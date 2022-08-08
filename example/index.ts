import "dotenv/config";
import NotionDatabase from "../src/notionDatabase";

(async () => {
  try {
    const notionDatabase = new NotionDatabase({
      secretKey: String(process.env.SECRET_KEY),
      databaseId: String(process.env.DATABASE_ID),
    });

    const filter = {
      and: [
        {
          property: "포스팅여부",
          checkbox: {
            equals: true,
          },
        },
        {
          property: "카운트",
          number: {
            greater_than_or_equal_to: 2,
          },
        },
      ],
    };
    const sorts = [{ property: "카운트", direction: "ascending" }];
    // query all
    const queyrResult = await notionDatabase.query({});
    console.log(queyrResult);

    // query filter
    const queyrFilterResult = await notionDatabase.query({ filter });
    console.log(queyrFilterResult);

    // query sort
    const queyrSortResult = await notionDatabase.query({ sorts });
    console.log(queyrSortResult);

    // query filter and sort
    const queyrFilterAndSortResult = await notionDatabase.query({
      filter,
      sorts,
    });
    console.log(queyrFilterAndSortResult);

    // // create
    // const createResult = await notionDatabase.create([
    //   { type: "title", key: "id", value: "new id" },
    //   { type: "text", key: "description", value: "description update" },
    //   { type: "text", key: "name", value: "name update" },
    //   { type: "checkbox", key: "포스팅여부", value: true },
    //   { type: "date", key: "포스팅날짜", value: "2022-09-01" },
    //   { type: "number", key: "카운트", value: 1163 },
    //   { type: "select", key: "status", value: "In" },
    // ]);
    // console.log(createResult);

    // // update
    // const updateResult = await notionDatabase.update({
    //   pageId: "899b9d3a-1f90-48fa-9a00-4643e56ae794",
    //   updateDatas: [
    //     { type: "title", key: "id", value: "id update" },
    //     { type: "text", key: "description", value: "description update" },
    //     { type: "text", key: "name", value: "name update" },
    //     { type: "checkbox", key: "포스팅여부", value: true },
    //     { type: "date", key: "포스팅날짜", value: "2022-02-01" },
    //     { type: "number", key: "카운트", value: 1122263 },
    //     { type: "select", key: "status", value: "Inaaa" },
    //   ],
    // });
    // console.log(updateResult);
  } catch (err) {
    console.log(err);
  }
})();
