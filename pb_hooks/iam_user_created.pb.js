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
		const response = await publish(eventName, eventData);
		console.log(response);
	}, retries);

	e.next();
}, "users");
