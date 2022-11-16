import { useEffect, useState } from 'react';

import { SpreadsheetData } from '../../interfaces/SpreadsheetData';
import { adapters } from '../../adapters';

export const useSpreadsheet = () => {
	const [file, setFile] = useState<File | null>(null);
	const [data, setData] = useState<SpreadsheetData[]>([]);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		setIsLoaded(false);
		setData([]);

		if (file === null) {
			setIsLoaded(true);
			return;
		}

		const adapter = adapters.find((ad) => ad.isValid(file.name));

		if (adapter === undefined) {
			setIsLoaded(true);
			return;
		}

		(async () => {
			const arrayBuffer = await file.arrayBuffer();
			await adapter.loadFromArrayBufferAsync(arrayBuffer);
			const tempData = await adapter.getDataAsync();
			setData(tempData);
			setIsLoaded(true);
		})();
	}, [file]);

	return {
		setFile,
		data,
		isLoaded
	};
};
