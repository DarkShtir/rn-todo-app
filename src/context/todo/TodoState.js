import React, { useReducer, useContext } from 'react';
import { Alert } from 'react-native';
import { TodoContext } from './todoContext';
import { todoReducer } from './todoReducer';
import {
	ADD_TODO,
	REMOVE_TODO,
	UPDATE_TODO,
	SHOW_LOADER,
	HIDE_LOADER,
	SHOW_ERROR,
	CLEAR_ERROR,
	FETCH_TODOS,
} from '../types';
import { ScreenContext } from '../screen/screenContext';
import { Http } from '../../http';

export const TodoState = ({ children }) => {
	const initialState = {
		todos: [],
		loading: false,
		error: null,
	};

	const { changeScreen } = useContext(ScreenContext);

	const [state, dispatch] = useReducer(todoReducer, initialState);

	const addTodo = async (title) => {
		clearError();
		try {
			const data = await Http.post(
				'https://rn-todo-app-2539c.firebaseio.com/todos.json',
				{ title }
			);
			dispatch({ type: ADD_TODO, title, id: data.name });
		} catch (error) {
			showError('Something went wrong. Try again!');
		}
	};

	const removeTodo = (id) => {
		const todo = state.todos.find((t) => t.id === id);
		Alert.alert(
			'Remove Todo',
			`Are you sure to remove: '${todo.title}'?`,
			[
				{
					text: 'Cancel',
					style: 'cancel',
				},
				{
					text: 'Remove',
					style: 'destructive',
					onPress: async () => {
						changeScreen(null);
						try {
							await Http.delete(
								`https://rn-todo-app-2539c.firebaseio.com/todos/${id}.json`
							);
							dispatch({ type: REMOVE_TODO, id });
						} catch (error) {
							showError('Something went wrong. Try again!');
						}
					},
				},
			],
			{ cancelable: false }
		);
	};

	const fetchTodos = async () => {
		showLoader();
		clearError();
		try {
			const data = await Http.get(
				`https://rn-todo-app-2539c.firebaseio.com/todos.json`
			);
			if (!data) {
				dispatch({ type: FETCH_TODOS, todos: [] });
			} else {
				const todos = Object.keys(data).map((key) => ({
					...data[key],
					id: key,
				}));
				dispatch({ type: FETCH_TODOS, todos });
			}
		} catch (error) {
			showError('Something went wrong. Try again!');
			console.log(error);
		} finally {
			hideLoader();
		}
	};

	const updateTodo = async (id, title) => {
		clearError();
		try {
			await Http.patch(
				`https://rn-todo-app-2539c.firebaseio.com/todos/${id}.json`,
				{ title }
			);
			dispatch({ type: UPDATE_TODO, id, title });
		} catch (error) {
			showError('Something went wrong. Try again!');
			console.log(error);
		}
	};

	const showLoader = () => dispatch({ type: SHOW_LOADER });

	const hideLoader = () => dispatch({ type: HIDE_LOADER });

	const showError = (error) => dispatch({ type: SHOW_ERROR, error });

	const clearError = () => dispatch({ type: CLEAR_ERROR });

	return (
		<TodoContext.Provider
			value={{
				todos: state.todos,
				loading: state.loading,
				error: state.error,
				addTodo,
				removeTodo,
				updateTodo,
				fetchTodos,
			}}
		>
			{children}
		</TodoContext.Provider>
	);
};
