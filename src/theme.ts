import { extendTheme } from '@chakra-ui/react';

export default extendTheme({
	config: {
		initialColorMode: 'dark',
		useSystemColorMode: false
	},

	styles: {
		global: (colorMode: string) => ({
			body: {
				bg: colorMode === 'dark' ? 'gray.800' : 'white',
				color: colorMode === 'dark' ? 'white' : 'gray.800'
			}
		})
	}
});
