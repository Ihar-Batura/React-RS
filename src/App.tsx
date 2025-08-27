import './App.css';
import { Suspense } from 'react';
import { Spinner } from './components/ui/spinner/Spinner';
import { Main } from './components/layout/Main';

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Main />
    </Suspense>
  );
}

export default App;
