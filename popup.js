let isChecked = false;
let checkedPort;

const checkButton = document.getElementById("checkButton");
const saveMessage = document.getElementById("saveMessage");
const saveButton = document.getElementById("saveButton");
const portInput = document.getElementById('portInput');
const tick = document.getElementById("tick");
const cross = document.getElementById("cross");

saveButton.addEventListener("click", () => {

	var message;

	if (!isChecked) {
		message = "No Port Checked. Please Check First";
	} else {
		// Save to local storage;
		localStorage.setItem('Port', checkedPort);
		message = `Port ${checkedPort} is Stored in Local Storage. This will be used as Engine Port`
	}
	saveMessage.textContent = message;
	saveMessage.classList.remove("hidden");

})

checkButton.addEventListener("click", () => {

	givenPort = portInput.value;

	pingEngine(givenPort).then((ok) => {

		if (ok) {
			cross.classList.add("hidden")
			tick.classList.remove("hidden")

			isChecked = true;
			checkedPort = givenPort;

		}
		else {
			tick.classList.add("hidden")
			cross.classList.remove("hidden")
		}
	});


});

const pingEngine = async (port) => {

	// Make the check request
	try {
		const response = await fetch(`http://127.0.0.1:${port}/check`);
		if (response.ok) {
			return true;
		}
	} catch (err) {
		return false;
	}
}
