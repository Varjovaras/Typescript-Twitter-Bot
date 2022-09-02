import { TwitterApi } from 'twitter-api-v2';
import * as dotenv from 'dotenv';
dotenv.config();

async function main() {
	console.log('Trying to tweet');
	if (
		typeof process.env.BEARER_TOKEN === 'string' &&
		typeof process.env.ACCESS_TOKEN === 'string' &&
		typeof process.env.ACCESS_TOKEN_SECRET === 'string' &&
		typeof process.env.CONSUMER_KEY === 'string' &&
		typeof process.env.CONSUMER_SECRET === 'string'
	) {
		const access = process.env.ACCESS_TOKEN;
		const accessSecret = process.env.ACCESS_TOKEN_SECRET;
		const consumer = process.env.CONSUMER_KEY;
		const consumerSecret = process.env.CONSUMER_SECRET;
		const client = new TwitterApi({
			appKey: consumer,
			appSecret: consumerSecret,
			accessToken: access,
			accessSecret: accessSecret,
		});

		// First, post all your images to Twitter
		const mediaIds = await Promise.all([
			// file path
			client.v1.uploadMedia('./perstai.jpg'),
		]);
		console.log('Posting');

		// mediaIds is a string[], can be given to .tweet
		await client.v1.tweet('Perstai!', {
			media_ids: mediaIds,
		});
		console.log('Posted');
	} else throw new Error(`Invalid tokens`);
}

const checkFriday = () => {
	const day = new Date().getUTCDay();
	const hours = new Date().getUTCHours();
	console.log('Day: ', day);
	console.log('Hours: ', hours);

	if (day === 5 && hours >= 5 && hours < 6) {
		void main();
	}
};

checkFriday();
setInterval(checkFriday, 3600000); // one hour check.
