import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import CardView from './pages/CardView';
import TableView from './pages/TableView';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/card-view" replace />} />
          <Route path="card-view" element={<CardView />} />
          <Route path="table-view" element={<TableView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;