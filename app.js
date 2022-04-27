// const { Client } = require("@notionhq/client");
require("dotenv").config();

// const notion = new Client({ auth: process.env.NOTION_KEY });

module.exports = {
    status: async function status(notion, databaseID) {
        try {
            const response = await notion.databases.retrieve({ database_id: databaseID });
            return { success: true }
        }
        catch (err) {
            return { success: false }
        }
    },
    readTodo: async function readTodo(notion, databaseID) {
        try {
            const response = await notion.databases.query({
                database_id: databaseID,
            });
            let results = response.results.map((res) => {
                return {
                    pageID: res.id,
                    url: res.url,
                    title: res.properties?.Todo?.title[0]?.plain_text,
                    priority: res.properties?.Priority.select?.name,
                    status: res.properties?.Status?.select?.name,
                    remarks: res.properties?.Remarks?.rich_text[0]?.plain_text,
                };
            });
            return { success: true, results };
        }
        catch (err) {
            console.log("status Code: " + err.status);
            return { success: false };
        }

    },
    createTodo: async function createTodo(notion, databaseID, data) {
        try {
            const response = await notion.pages.create({
                parent: {
                    database_id: databaseID
                },
                properties: {
                    Todo: {
                        type: "title",
                        title: [
                            {
                                text: {
                                    content: data.title
                                }
                            }
                        ]
                    },
                    Priority:
                    {
                        select: {
                            name: data.priority
                        }
                    },
                    Status:
                    {
                        select: {
                            name: data.status
                        }
                    },
                    Remarks:
                    {
                        rich_text: [
                            {
                                text: {
                                    content: data.remarks
                                }
                            }
                        ]
                    }
                }
            });
            return { success: true, pageID: response.id }
        }
        catch (err) {
            return { success: false }
        }

    },
    deleteTodo: async function deleteTodo(notion, pageID) {
        try {
            const response = await notion.blocks.delete({
                block_id: pageID
            })
            console.log(response);
            return { success: true }
        }
        catch (err) {
            console.log(err);
            return { success: false }
        }
    },
    updateTodo: async function updateTodo(notion, data) {
        try {
            const response = await notion.pages.update({
                page_id: data.pageID,
                properties: {
                    Todo: {
                        type: "title",
                        title: [
                            {
                                text: {
                                    content: data.title
                                }
                            }
                        ]
                    },
                    Priority:
                    {
                        select: {
                            name: data.priority
                        }
                    },
                    Status:
                    {
                        select: {
                            name: data.status
                        }
                    },
                    Remarks:
                    {
                        rich_text: [
                            {
                                text: {
                                    content: data.remarks
                                }
                            }
                        ]
                    }
                }
            })

            return { success: true, pageID: response.id }
        }
        catch (err) {
            return { success: false }
        }
    },
    dev: async function dev(notion, databaseID) {
        try {
            const response = await notion.databases.query({
                database_id: databaseID,
            });
            // console.log(response)
            return { success: true, results: response.results };
        }
        catch (err) {
            return { success: false }
        }
    }
};
