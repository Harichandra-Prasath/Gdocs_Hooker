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
			naviagateDocs()
		} else {

			console.log(`Recieved a non .docx file, Ignoring...`);

		}
	}
}




const naviagateDocs = () => {

	browser.tabs.create({
		url: "https://docs.google.com/",

	}).then((tab) => {
		console.log(`Created a new tab with id ${tab.id}`);
	}, (err) => {
		console.log(`Error in creating a new tab ${err}`);
	})

}



browser.downloads.onChanged.addListener(stateWatcher)
