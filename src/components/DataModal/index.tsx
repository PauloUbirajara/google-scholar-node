import ExcelJS from 'exceljs';
import {
	Modal,
	Skeleton,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

interface DataModalProps {
	file: File | null;
}

export const DataModal = (props: DataModalProps) => {
	const { isOpen, onOpen: openModal, onClose: closeModal } = useDisclosure();
	const [isLoaded, setIsLoaded] = useState(false);

	// TODO Criar tipos de tabs - chakra
	// TODO Mostrar uma tabela com uma prévia dos dados - não é necessário mostrar todos os dados, mas é preciso mostrar todas as colunas
	// TODO Mover parte do carregamento da planilha para hook separado (dados, loaded)

	useEffect(() => {
		const { file } = props;

		setIsLoaded(false);

		if (file === null) {
			setIsLoaded(true);
			return;
		}

		(async () => {
			openModal();

			const buffer = await file.arrayBuffer();
			const workbook = new ExcelJS.Workbook();

			await workbook.xlsx.load(buffer);

			setIsLoaded(true);
		})();
	}, [props.file]);

	return (
		<Modal isOpen={isOpen} onClose={closeModal}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Visualizar planilha</ModalHeader>
				<ModalCloseButton />
				<Skeleton isLoaded={isLoaded}>
					<ModalBody pb={6}>
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam,
						beatae? Eligendi deleniti sint voluptates cupiditate molestiae. Illo
						amet, earum possimus doloremque quos quis corporis accusamus odit
						nisi officia culpa cumque sequi. Tempore impedit similique velit
						asperiores voluptates, molestias doloremque exercitationem
						recusandae labore consectetur ea cum voluptatibus cumque qui quae
						obcaecati.
					</ModalBody>
				</Skeleton>

				<ModalFooter>
					<Button colorScheme="blue" onClick={closeModal}>
						Ok
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
