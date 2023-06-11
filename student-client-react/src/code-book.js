export const getCodeBookItemName = (codeBooks, codeBookCode, codeBookItemCode, language) => {
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

export const getCodeBookOptions = (codeBooks, codeBookCode, language, withEmpty = false) =>
	codeBooks[codeBookCode] ? (
		<>
			{withEmpty ? <option key=""></option> : null}
			{codeBooks[codeBookCode].map((item) => (
				<option key={item.code} value={item.code}>
					{item.names[language] ?? item.code}
				</option>
			))}
		</>
	) : null;

export const getCodeBookRadioButtons = (codeBooks, codeBookCode, language, checkedValue, radioOnChange) =>
	codeBooks[codeBookCode] ? (
		<>
			{codeBooks[codeBookCode].map((item) => (
				<span key={item.code}>
					<label className="form-check-label">
						<input
							type="radio"
							value={item.code}
							checked={item.code === checkedValue}
							onChange={radioOnChange}
							className="form-check-input"
						/>{" "}
						{item.names[language] ?? item.code}
					</label>{" "}
				</span>
			))}
		</>
	) : null;
