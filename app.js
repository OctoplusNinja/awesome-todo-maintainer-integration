const { Client } = require("@notionhq/client");
require("dotenv").config();

const notion = new Client({ auth: process.env.NOTION_KEY });
const databaseID = process.env.NOTION_DATABASE_ID;

module.exports = {
    readTodo: async function readTodo() {
        const response = await notion.databases.query({
            database_id: databaseID,
        });
        let result = response.results.map((res) => {
            return {
                pageID: res.id,
                url: res.url,
                title: res.properties?.Todo?.title[0]?.plain_text,
                priority: res.properties?.Priority.select?.name,
                status: res.properties?.Status?.select?.name,
                remarks: res.properties?.Remarks?.rich_text[0]?.plain_text,
            };
        });
        return result;
    },
    dev: async function dev() {
        const response = await notion.databases.query({
            database_id: databaseID,
        });
        return response.results;
    }
};
