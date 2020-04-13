import React, { useState } from 'react';
import {
	StyleSheet,
	TextInput,
	View,
	Button,
	Modal,
	Alert,
} from 'react-native';
import { THEME } from '../theme';

export const EditModal = ({ visible, onCancel, onSave, value }) => {
	const [title, setTitle] = useState(value);

	const saveHandler = () => {
		if (title.trim().length < 3) {
			Alert.alert(
				'Error!',
				`Minimal length title 3 symbols. Just now length is ${
					title.trim().length
				} symbols.`
			);
		} else {
			onSave(title);
		}
	};

	return (
		<Modal visible={visible} animationType='slide' transparent={false}>
			<View style={styles.wrap}>
				<TextInput
					value={title}
					onChangeText={setTitle}
					style={styles.input}
					placeholder='Input title...'
					autoCapitalize='none'
					autoCorrect={false}
					maxLength={64}
				/>
				<View style={styles.buttons}>
					<Button
						title='Cancel'
						onPress={() => {
							setTitle(value);
							onCancel();
						}}
						color={THEME.DANGER_COLOR}
					/>
					<Button title='Save' onPress={saveHandler} />
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	wrap: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	input: {
		padding: 10,
		borderBottomColor: THEME.MAIN_COLOR,
		borderBottomWidth: 2,
		width: '80%',
	},
	buttons: {
		width: '100%',
		marginTop: 10,
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
});
