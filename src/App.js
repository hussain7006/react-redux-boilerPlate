import { Provider } from 'react-redux';
import './App.css';
import store from './config/redux/store';
import AppRouter from './config/routes/AppRouter';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <AppRouter />

      </Provider>
    </div>
  );
}

export default App;
