const { Client } = require("@notionhq/client");

const auth = (req, res, next) => {
    res.locals.client = new Client({ auth: req.query.NOTION_KEY });
    console.log(req.query.NOTION_KEY);
    next();
}

module.exports = auth;