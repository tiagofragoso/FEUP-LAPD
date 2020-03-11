const axios = require("axios");
const qs = require("querystring");
require("dotenv").config();

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

const auth = async () => {
	const encoded_auth = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
	try {
		const res = await axios.post(
			"https://accounts.spotify.com/api/token",
			qs.stringify({ grant_type: "client_credentials" }),
			{
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				"Authorization": `Basic ${encoded_auth}`
			}
		});

		const { data } = res;

		return data;
	} catch (err) {
		console.log(err);
	}
} ;

const printAlbums = ({ items }) => {
	console.log(`Albums (${items.length})`);
	for (const item of items) {
		console.log(`${item.name} - ${item.artists.map(i => i.name).toString()}`);
	}
	console.log("\n");
};

const printArtists = ({ items }) => {
	console.log(`Artists (${items.length})`);
	for (const item of items) {
		console.log(item.name);
	}
	console.log("\n");
};

const printTracks = ({ items }) => {
	console.log(`Tracks (${items.length})`);
	for (const item of items) {
		console.log(`${item.name} - ${item.artists.map(i => i.name).toString()}`);
	}
	console.log("\n");
};

const search = async () => {
	const auth_data = await auth();

	if (auth_data) {
		try {
			const { access_token, token_type } = auth_data;

			const res = await axios.get(
				"https://api.spotify.com/v1/search",
				{
					params: { 
						q: "U2",
						type: "album,artist,track",
						limit: "5"
					},
					headers: {
						"Authorization": `${token_type} ${access_token}`
				}
			});
			
			const { albums, artists, tracks } = res.data;
			printAlbums(albums);
			printArtists(artists);
			printTracks(tracks);

		} catch (err) {
			console.log(err);
		}
	}
}

search();