import { TwitterApi } from 'twitter-api-v2';
import * as dotenv from 'dotenv';
dotenv.config();

const main = async () => {
	console.log('Trying to tweet');

	const access = process.env.ACCESS_TOKEN ?? '';
	const accessSecret = process.env.ACCESS_TOKEN_SECRET ?? '';
	const consumer = process.env.CONSUMER_KEY ?? '';
	const consumerSecret = process.env.CONSUMER_SECRET ?? '';

	const client = new TwitterApi({
		appKey: consumer,
		appSecret: consumerSecret,
		accessToken: access,
		accessSecret: accessSecret,
	});
	console.log('pasalusta');

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
};

const checkFriday = () => {
	const day = new Date().getUTCDay();
	const hours = new Date().getUTCHours();
	console.log('Day: ', day);
	console.log('Hours: ', hours);

	if (day === 5 && hours >= 5 && hours < 6) {
		void main();
	}
};

console.log('Deployed');
checkFriday();
setInterval(checkFriday, 3600000); // one hour check.
