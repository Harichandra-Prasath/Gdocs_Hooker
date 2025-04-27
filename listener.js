function activeWatcher(delta) {

	if (delta.state && delta.state.current === "complete") {
		console.log(delta.id);
	}

}

browser.downloads.onChanged.addListener(activeWatcher)
