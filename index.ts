import { TwitterApi } from 'twitter-api-v2';
import * as dotenv from 'dotenv';
dotenv.config();

let postingTime = 5; //default global posting time UTC. Might change every friday 0:00 UTC

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

	const mediaIds = await Promise.all([client.v1.uploadMedia('./perstai.jpg')]);

	await client.v1.tweet('Perstai!', {
		media_ids: mediaIds,
	});
	console.log('Posted');
};

const getPostingTime = (min: number, max: number) => {
	return Math.floor(min + Math.random() * (max - min + 1));
};

const checkFriday = () => {
	const currentDay = new Date().getUTCDay();
	const currentHour = new Date().getUTCHours();

	//change posting time on friday
	if (currentDay === 5 && currentHour === 9) {
		postingTime = getPostingTime(2, 7); //utc hours 2-7
	}

	console.log('Day: ', currentDay);
	console.log('Hours: ', currentHour);
	console.log('Posting time: ', postingTime);

	if (currentDay === 5 && currentHour === postingTime) {
		void main();
	}
};

console.log('Deployed');
checkFriday();
setInterval(checkFriday, 3600000); // one hour check.
