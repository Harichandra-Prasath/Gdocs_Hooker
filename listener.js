function stateWatcher(delta) {

	let id = delta.id;

	if (delta.state && delta.state.current === "complete") {
		browser.downloads.search({ id }).then(handleDownloaded);
	}

}


function handleDownloaded(downloadedFile) {

	for (const download of downloadedFile) {

		// Check for the docx extension
		let fileName = download.filename;

		if (fileName.endsWith(".docx")) {
			console.log(`Got a .docx file with name ${fileName}`);
			startAction(fileName).then((id) => {
				if (id) {
					naviagateDocs(id)
				}
			})
		} else {
			console.log(`Recieved a non .docx file, Ignoring...`);
		}
	}
}

const startAction = async (fileName) => {

	// Create a post method
	const response = await fetch("http://127.0.0.1:8000/upload_to_drive", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ "FilePath": fileName })
	});

	const response_data = await response.json();

	console.log(response_data)

	if (response.ok) {
		return response_data.id
	} else {
		return null
	}

}

const naviagateDocs = (docId) => {

	// Opens with default google account
	browser.tabs.create({
		url: `https://docs.google.com/document/d/${docId}`,
	}).then((tab) => {
		console.log(`Created a new tab with id ${tab.id}`);
	}, (err) => {
		console.log(`Error in creating a new tab ${err}`);
	})

}



browser.downloads.onChanged.addListener(stateWatcher)
