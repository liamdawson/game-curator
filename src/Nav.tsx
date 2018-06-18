import * as React from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.css';

export default function() {
  return (
    <nav className="container">
      <h1>Game Curator</h1>
      <NavLink to="/curate">Curate</NavLink>
      <NavLink to="/new-game">Suggest a Game</NavLink>
    </nav>
  );
}