import './App.css';
import { Suspense } from 'react';
import { Spinner } from './components/ui/spinner/Spinner';
import { Table } from './components/table/Table';

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Table />
    </Suspense>
  );
}

export default App;
