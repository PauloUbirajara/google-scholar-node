import { ChangeEvent, useMemo, useState } from 'react';
import { Input, Stack } from '@chakra-ui/react';

import { CustomFormControl } from '../../components/CustomFormControl';
import { DataModal } from '../../components/DataModal';
import { validateColumn, validateFile } from './form.validations';

export const Main = () => {
	const [file, setFile] = useState<File | null>(null);
	const [column, setColumn] = useState<string>('');

	const isValidFile = useMemo(() => validateFile(file), [file]);
	const isValidColumn = useMemo(() => validateColumn(column), [column]);

	const handleChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			setFile(Array.from(event.target.files)[0]);
		}
	};

	const handleChangeColumn = (event: ChangeEvent<HTMLInputElement>) => {
		setColumn(event.target.value);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!isValidFile || !isValidColumn) {
			return;
		}

		// TODO Quando tiver tudo OK, fazer a mesma coisa que o código em python que é:
		// Para cada página de planilha, fazer uma requisição para o Google Scholar
		// Obter os seguintes dados:
		// - H-Index
		// - I10-Index
		// - Citações de 2015 até o ano atual
		//
		// Depois, gerar um arquivo de saída com os dados obtidos adicionando à planilha original, com o nome modificado para conter o dia e a hora da coleta
	};

	return (
		<form onSubmit={handleSubmit}>
			<Stack p={5} direction={'column'} spacing={5}>
				<CustomFormControl
					input={<Input type="file" onChange={handleChangeFile} p={'2'} />}
					isValid={isValidFile}
					label={'Planilha'}
					required={true}
					textIfInvalid={'O upload de uma planilha válida é obrigatório.'}
					textIfValid={
						'Selecione a planilha com os dados dos pesquisadores do Google Scholar.'
					}
				/>

				<CustomFormControl
					input={<Input type="text" onChange={handleChangeColumn} />}
					isValid={isValidColumn}
					label={'Nome da coluna'}
					required={true}
					textIfInvalid={'O nome da coluna é obrigatório.'}
					textIfValid={'Selecione a coluna com os links dos pesquisadores.'}
				/>

				{isValidFile && <DataModal file={file} />}

				<CustomFormControl
					input={<Input type="submit" />}
					isValid={isValidColumn}
					required={true}
					textIfInvalid={'Há algum dado inválido, verifique e envie novamente.'}
				></CustomFormControl>
			</Stack>
		</form>
	);
};
