import { RouterProvider } from 'react-router-dom';
import router from './app/router/router/router';
import { Toaster } from 'react-hot-toast';
function App() {
  return (
    <div>
      <RouterProvider router={router} />
      <Toaster position="top-left" reverseOrder={false} />
    </div>
  );
}

export default App;
