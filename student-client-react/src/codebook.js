export const CODEBOOK_NAME_GENDER = "GENDER";
export const CODEBOOK_NAME_HOUSE = "HOUSE";
export const CODEBOOK_NAME_YEAR = "YEAR";

const LANGUAGE = "en";

export const getCodebookItemName = (codebooks, codebookCode, codebookItemCode) => {
	let codebookItemName = codebookItemCode;
	const codebook = codebooks[codebookCode];
	if (codebook) {
		const codebookItem = codebook.find((item) => item.code === codebookItemCode);
		if (codebookItem && codebookItem.names[LANGUAGE]) {
			codebookItemName = codebookItem.names[LANGUAGE];
		}
	}
	return codebookItemName;
};

export const getCodebookOptions = (codebooks, codebookCode, withEmpty = false) =>
	codebooks[codebookCode] ? (
		<>
			{withEmpty ? <option key=""></option> : null}
			{codebooks[codebookCode].map((item) => (
				<option key={item.code} value={item.code}>
					{item.names[LANGUAGE] ?? item.code}
				</option>
			))}
		</>
	) : null;

export const getCodebookRadioButtons = (codebooks, codebookCode, checkedValue, radioOnChange) =>
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
						{item.names[LANGUAGE] ?? item.code}
					</label>{" "}
				</span>
			))}
		</>
	) : null;
