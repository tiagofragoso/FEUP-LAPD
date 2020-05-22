const axios = require("axios");

const API_URL = "https://en.wikipedia.org/w/api.php";

const get_extract = async (query, type, album_details) => {
    try {
        const { data: { query: { search: search_results } } } = await search(query);
        let id;
        if (search_results.length) {
            const { result: topResult, score } = sortResults(search_results, query, type, album_details);
            if (score < 0) {
                return null;
            }
            id = topResult.pageid;
        } else {
            return null;
        }

        const { data: { query: { pages: extract_results } } } = await extract(id);

        const extractKeys = Object.keys(extract_results);

        if (extractKeys.length) {
            const extract = extract_results[extractKeys[0]].extract;
            if (extract.toLowerCase().includes("may refer to")) { // probably a desambiguation page
                return null;
            }

            return {
                extract,
                url: `https://en.wikipedia.org/?curid=${id}`,
            };
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
                "srlimit": "25",
                "format": "json",
                "utf8": "",
            },
        },
    );

const extract = (id) =>
    axios.get(
        API_URL,
        {
            params: {
                "action": "query",
                "prop": "extracts",
                "exsentences": "10",
                "pageids": id,
                "format": "json",
                "exintro": "true",
                "explaintext": "true",
            },
        },
    );

const sortResults = (results, query, type, album_details) => results.reduce(
    (acc, curr) => {
        if (!curr.title.toLowerCase().includes(query.toLowerCase())) {
            return acc;
        }

        const currScore = calculateMatchScore(curr, type, album_details);
        if (currScore > acc.score) {
            acc.result = curr;
            acc.score = currScore;
        }
        return acc;
    },
    { score: -1 });

const calculateMatchScore = (result, type, album_details) => {
    let score = 0;
    const { title, snippet } = result;
    let regex;
    if (type === "album") {
        const { type, artists } = album_details;
        // increase score if album type and artists are mentioned
        regex = new RegExp([type, ...artists].map((i) => `(${i})`).join("|"));
    } else {
        // increase score if these keywords are mentioned
        regex = new RegExp(["singer", "band", "songwriter", "musician"].map((i) => `(${i})`).join("|"));
    }
    score += (title.match(regex) || []).length;
    score += (snippet.match(regex) || []).length;
    return score;
};

module.exports = {
    get_extract,
};
