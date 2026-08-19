const PUBLISH_URL = "http://192.168.68.50:15672/api/exchanges/%2F//publish";

const publish = async (event, payload) => {
	const response = await fetch(PUBLISH_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Basic " + btoa("proxmox:proxmox"),
		},
		body: JSON.stringify({
			properties: {
				content_type: "application/json",
			},
			routing_key: "alphadate-webservice-events",
			payload: JSON.stringify({
				type: event,
				data: payload,
			}),
			payload_encoding: "string",
		}),
	});

	if (!response.ok) {
		throw new Error("Failed to publish message");
	}

	return response.json();
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const retry = async (fn, retryTime = 3) => {
	for (let i = 0; i < retryTime; i++) {
		try {
			return await fn();
		} catch (error) {
			console.log(error);
			console.log(`Retrying in ${i + 1} seconds`);
			await sleep(1000);
		}
	}

	return null;
};

onRecordAfterCreateSuccess((e) => {
	const eventName = "User.Created";
	const eventData = {
		code: e.code,
		username: e.username,
		email: e.email,
	};
	const retryTime = 3;

	retry(async () => {
		const response = await publish(eventName, eventData);
		console.log("Retry response: ", response);
	}, retryTime);

	e.next();
}, "users");
