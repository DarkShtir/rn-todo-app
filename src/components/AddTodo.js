import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { THEME } from '../theme';

export const AddTodo = ({ onSubmit }) => {
	const [value, setValue] = useState('');

	const pressHandler = () => {
		if (value.trim()) {
			onSubmit(value);
			setValue('');
		} else {
			Alert.alert(`Name of todos mustn't be empty`);
		}
	};

	return (
		<View style={styles.block}>
			<TextInput
				style={styles.input}
				//* В setValue автоматически передаётся text,
				// onChangeText={(text) => setValue(text)}
				//* Сокращённая форма записи выше
				onChangeText={setValue}
				value={value}
				placeholder='Input your todo...'
				autoCorrect={false}
				autoCapitalize='none'
			/>
			<View style={styles.button}>
				<Button title='Add' onPress={pressHandler} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	block: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 15,
	},
	input: {
		width: '70%',
		padding: 10,
		borderStyle: 'solid',
		borderBottomWidth: 2,
		borderBottomColor: THEME.GREY_COLOR,
	},
	button: {
		width: '30%',
	},
});
