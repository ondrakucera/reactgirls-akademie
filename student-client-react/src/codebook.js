export const CODEBOOK_NAME_GENDER = "GENDER";
export const CODEBOOK_NAME_HOUSE = "HOUSE";
export const CODEBOOK_NAME_YEAR = "YEAR";

export const getCodebookItemName = (codebooks, codebookCode, codebookItemCode, language) => {
	let codebookItemName = codebookItemCode;
	const codebook = codebooks[codebookCode];
	if (codebook) {
		const codebookItem = codebook.find((item) => item.code === codebookItemCode);
		if (codebookItem && codebookItem.names[language]) {
			codebookItemName = codebookItem.names[language];
		}
	}
	return codebookItemName;
};

export const getCodebookOptions = (codebooks, codebookCode, language, withEmpty = false) =>
	codebooks[codebookCode] ? (
		<>
			{withEmpty ? <option key=""></option> : null}
			{codebooks[codebookCode].map((item) => (
				<option key={item.code} value={item.code}>
					{item.names[language] ?? item.code}
				</option>
			))}
		</>
	) : null;

export const getCodebookRadioButtons = (codebooks, codebookCode, language, checkedValue, radioOnChange) =>
	codebooks[codebookCode] ? (
		<>
			{codebooks[codebookCode].map((item) => (
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
