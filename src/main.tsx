import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { Provider } from 'react-redux';
import store from './store/index.ts';
import {router} from './routes/routes.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
