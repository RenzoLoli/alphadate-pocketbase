const { publish, retry } = require(`${__hooks}./utils`);

const PUBLISH_URL = "http://192.168.68.50:15672/api/exchanges/%2F//publish";

onRecordAfterCreateSuccess(async (e) => {
	const eventName = "User.Created";
	const eventData = {
		code: e.record.get("code"),
		username: e.record.get("username"),
		email: e.record.get("email"),
	};
	const retries = 3;

	const response = await retry(
		() => publish(PUBLISH_URL, eventName, eventData),
		retries,
	);

	console.log(response);

	e.next();
}, "users");
