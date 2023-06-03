export const getCodeBookName = (codeBooks, codeBookCode, codeBookItemCode, language) => {
	let result = codeBookItemCode;
	const codeBook = codeBooks[codeBookCode];
	if (codeBook) {
		const codeBookItem = codeBook.find((item) => item.code === codeBookItemCode);
		if (codeBookItem && codeBookItem.names[language]) {
			result = codeBookItem.names[language];
		}
	}
	return result;
};
