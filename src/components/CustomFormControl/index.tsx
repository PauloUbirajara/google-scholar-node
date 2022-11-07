import {
	FormControl,
	FormErrorMessage,
	FormHelperText,
	FormLabel
} from '@chakra-ui/react';
import { useState } from 'react';

interface FormControlProps {
	input: JSX.Element;
	isValid: boolean;
	label?: string;
	required: boolean;
	textIfInvalid: string;
	textIfValid?: string;
}

export const CustomFormControl = (props: FormControlProps) => {
	const [touched, setTouched] = useState(false);

	return (
		<FormControl
			isInvalid={touched && !props.isValid}
			isRequired={props.required}
			onChange={() => setTouched(true)}
		>
			<>
				{props.label && <FormLabel>{props.label}</FormLabel>}
				{props.input}

				{touched && !props.isValid ? (
					<FormErrorMessage>{props.textIfInvalid}</FormErrorMessage>
				) : (
					<FormHelperText>{props.textIfValid}</FormHelperText>
				)}
			</>
		</FormControl>
	);
};
