const axios = require("axios");

const API_URL = "https://en.wikipedia.org/w/api.php";

const get_extract = async (query) => {
    try {
        const { data: { query: { search: search_results } } } = await search(query);
        let title;

        if (search_results.length) {
            title = search_results[0].title;
        } else {
            return null;
        }

        const { data: { query: { pages: extract_results } } } = await extract(title);

        const extractKeys = Object.keys(extract_results);

        if (extractKeys.length) {
            return extract_results[extractKeys[0]].extract;
        } else {
            return null;
        }
    } catch (err) {
        console.error("Error searching wikipedia: ", err);
        return null;
    }
};

const search = (query) =>
    axios.get(
        API_URL,
        {
            params: {
                "action": "query",
                "list": "search",
                "srsearch": query,
                "format": "json",
                "utf8": "",
            },
        },
    );

const extract = (title) =>
    axios.get(
        API_URL,
        {
            params: {
                "action": "query",
                "prop": "extracts",
                "exsentences": "10",
                "titles": title,
                "format": "json",
                "exintro": "true",
                "explaintext": "true",
            },
        },
    );

module.exports = {
    get_extract,
};
