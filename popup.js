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

	const ok = pingEngine(givenPort);

	// For now, Just Hardcode it
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

const pingEngine = (port) => {

	return port == "3000";

}
