import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const [games, setGames] = useState([]);
    const [newGame, setNewGame] = useState({ teams: '', date: '', location: '' });

    const fetchGames = async () => {
        const response = await axios.get('http://localhost:5000/games');
        setGames(response.data);
    };

    useEffect(() => {
        fetchGames();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/games', newGame);
        setNewGame({ teams: '', date: '', location: '' });
        fetchGames();
    };

    return (
        <div>
            <h1>Basketball Games</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={newGame.teams}
                    onChange={(e) => setNewGame({ ...newGame, teams: e.target.value })}
                    placeholder="Teams"
                    required
                />
                <input
                    type="date"
                    value={newGame.date}
                    onChange={(e) => setNewGame({ ...newGame, date: e.target.value })}
                    required
                />
                <input
                    type="text"
                    value={newGame.location}
                    onChange={(e) => setNewGame({ ...newGame, location: e.target.value })}
                    placeholder="Location"
                    required
                />
                <button type="submit">Add Game</button>
            </form>
            <ul>
                {games.map((game) => (
                    <li key={game._id}>
                        {game.teams} - {new Date(game.date).toLocaleDateString()} - {game.location}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;

