import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

import { store } from './src/redux/store'
import { Provider } from 'react-redux'

const PanicApp = () =>
    <Provider store={store}>
      <App/>
    </Provider>

AppRegistry.registerComponent(appName, () => PanicApp);
