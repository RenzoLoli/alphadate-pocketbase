const PUBLISH_URL = "http://192.168.68.50:15672/api/exchanges/%2F//publish";

onRecordAfterCreateSuccess(async (e) => {
	const { publish, retry } = require(`${__hooks}./utils.js`);
	const eventName = "User.Created";
	const eventData = {
		code: e.record.get("code"),
		username: e.record.get("username"),
		email: e.record.get("email"),
	};
	const retries = 3;

	retry(async () => {
		const response = await publish(PUBLISH_URL, eventName, eventData);
		console.log(response);
	}, retries);

	e.next();
}, "users");
