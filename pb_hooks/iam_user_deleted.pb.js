onRecordAfterDeleteSuccess((e) => {
	const { publish, retry } = require(`${__hooks}./utils.js`);
	const eventName = "User.Deleted";
	const eventData = {
		code: e.record.get("code"),
	};
	const retries = 3;

	retry(async () => {
		const response = await publish(eventName, eventData);
		console.log(response);
	}, retries);

	e.next();
}, "users");
