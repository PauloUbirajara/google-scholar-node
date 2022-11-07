export const validateFile = (file: File | null) => {
	if (!file || file === null) {
		return false;
	}

	const VALID_SPREADSHEET_EXTENSIONS = ['csv', 'xls', 'xlsx'];
	return VALID_SPREADSHEET_EXTENSIONS.includes(
		file.name.split('.').pop() || ''
	);
};

export const validateColumn = (column: string) => {
	return column.trim() !== '';
};
