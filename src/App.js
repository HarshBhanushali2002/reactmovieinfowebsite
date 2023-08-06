import React from 'react';
import Homepage from './components/Homepage';
import MovieDetails from './components/MovieDetails';
import { Routes, Route } from 'react-router-dom';
import "./App.css";


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage/>} />
      <Route path="movie/:id" element={<MovieDetails/>} />
    </Routes>
  );
};

export default App;

