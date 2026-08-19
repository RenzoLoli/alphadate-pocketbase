const publish = async (url, event, payload) => {
	console.log(event, payload);
	const response = await fetch(url, {
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

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const retry = async (fn, retryTime = 3) => {
	console.log("Starting...");
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

module.exports = { publish, sleep, retry };
