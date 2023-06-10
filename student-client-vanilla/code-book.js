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
