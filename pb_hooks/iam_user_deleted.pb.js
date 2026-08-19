const PUBLISH_URL = "http://192.168.68.50:15672/api/exchanges/%2F//publish";

onRecordAfterDeleteSuccess((e) => {
	const { publish, retry } = require(`${__hooks}./utils.js`);
	const eventName = "User.Deleted";
	const eventData = {
		code: e.record.get("code"),
	};
	const retries = 3;

	retry(async () => {
		const response = await publish(PUBLISH_URL, eventName, eventData);
		console.log(response);
	}, retries);

	e.next();
}, "users");
