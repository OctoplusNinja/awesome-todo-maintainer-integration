const { Client } = require("@notionhq/client");
// require("dotenv").config();

const notion = new Client({ auth: process.env.NOTION_KEY });
const databaseID = process.env.NOTION_DATABASE_ID;

module.exports = async function getTodo() {
    const response = await notion.databases.query({
        database_id: databaseID,
    });
    let result = response.results.map((res) => {
        return {
            title: res.properties.Todo.title[0].plain_text,
            priority: res.properties.Priority.select.name,
            status: res.properties.Status.select.name,
            remarks: res.properties.Remarks.rich_text[0].plain_text,
        };
    });
    return result;
};

// (async () => {
//     const pageID = '1581c6ee-c6a0-4d0b-80da-d9ade25e4989'
//     const res = await notion.pages.retrieve({ page_id: pageID });
//     console.log(res);
// })();
