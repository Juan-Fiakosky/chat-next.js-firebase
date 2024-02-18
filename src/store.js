import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers'; 

const store = createStore(rootReducer);

export default function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}