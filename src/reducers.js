const initialState = {
	chat: {
		messages: [],
	},
};

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case "ADD_MESSAGE":
			return {
				...state,
				chat: {
					...state.chat,
					messages: [...state.chat.messages, action.payload],
				},
			};
		case "LOAD_MESSAGES":
			return {
				...state,
				chat: {
					...state.chat,
					messages: action.payload,
				},
			};
		default:
			return state;
	}
};

export default rootReducer;
