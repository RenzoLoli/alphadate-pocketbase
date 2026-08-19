const { publish, retry } = require(`${__hooks}./utils`);

const PUBLISH_URL = "http://192.168.68.50:15672/api/exchanges/%2F//publish";

onRecordAfterDeleteSuccess(async (e) => {
	const eventName = "User.Deleted";
	const eventData = {
		code: e.record.get("code"),
	};
	const retries = 3;

	const response = await retry(
		() => publish(PUBLISH_URL, eventName, eventData),
		retries,
	);

	console.log(response);

	e.next();
}, "users");
