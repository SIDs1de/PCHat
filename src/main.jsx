import ReactDOM from 'react-dom/client'
import './index.scss'
import 'normalize.css'
import { Provider } from 'react-redux'
import store from './store/store'
import App from './components/App/App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
