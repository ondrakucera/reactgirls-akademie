const getCodeBookItemName = (codeBooks, codeBookCode, codeBookItemCode, language) => {
	let codeBookItemName = codeBookItemCode;
	const codeBook = codeBooks[codeBookCode];
	if (codeBook) {
		const codeBookItem = codeBook.find((item) => item.code === codeBookItemCode);
		if (codeBookItem && codeBookItem.names[language]) {
			codeBookItemName = codeBookItem.names[language];
		}
	}
	return codeBookItemName;
};

const getCodeBookOptionsString = (codeBooks, codeBookCode, language, checkedValue, withEmpty = false) =>
	`${withEmpty ? "<option></option>" : ""}${codeBooks[codeBookCode]
		.map(
			(item) =>
				`<option value="${item.code}"${item.code === checkedValue ? ' selected="selected"' : ""}>${
					item.names[language] ?? item.code
				}</option>`
		)
		.join("")}`;

const getCodeBookRadioButtonsString = (codeBooks, codeBookCode, language, checkedValue) =>
	codeBooks[codeBookCode]
		.map(
			(item) =>
				`<label><input type="radio" name="${codeBookCode}" value="${item.code}"${
					item.code === checkedValue ? ' checked="checked"' : ""
				}> ${item.names[language] ?? item.code}</label>`
		)
		.join("");
