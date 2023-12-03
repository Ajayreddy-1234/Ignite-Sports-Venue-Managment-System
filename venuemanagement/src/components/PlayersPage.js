import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PlayerCard from "./PlayerCard";

function PlayersPage() {
  const [players, setPlayers] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedAgeRange, setSelectedAgeRange] = useState('');
  const [isAvailableChecked, setIsAvailableChecked] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.post('/api/fetch-players', {});
      setPlayers(response.data);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAgeRangeChange = (e) => {
    setSelectedAgeRange(e.target.value);
  };

  const handleAvailableChange = (e) => {
    setIsAvailableChecked(e.target.checked);
  };

  return (
    <div className="PlayersViewHost">
      <form className='searchForm'>
        <input className="searchInput" placeholder="Search Players" onChange={(e) => setSearch(e.target.value)} />
        <div>
          <label htmlFor="ageRange">Filter by Age Range:
            <select id="ageRange" onChange={handleAgeRangeChange} value={selectedAgeRange}>
                <option value="">All</option>
                <option value="18-22">18-22</option>
                <option value="23-30">23-30</option>
                <option value="31-40">31-40</option>
                <option value="40+">40+</option>
            </select>
          </label>
        </div>
        <div className='playerCheckbox'>
          <label>
            Available
            <input className="checkbox" type="checkbox" checked={isAvailableChecked} onChange={handleAvailableChange} />
          </label>
        </div>
      </form>
      <div className="PlayersBody">
        <div>
          {players
            .filter((item) => {
              return (
                (search.toLowerCase() === '' || item.gender.toLowerCase().includes(search) ||
                  item.sport_activity_name.toLowerCase().includes(search) ||
                  item.skill_level.toLowerCase().includes(search)) &&
                (selectedAgeRange === '' ||
                  (selectedAgeRange === '18-22' && item.age >= 18 && item.age <= 22) ||
                  (selectedAgeRange === '23-30' && item.age >= 23 && item.age <= 30) ||
                  (selectedAgeRange === '31-40' && item.age >= 31 && item.age <= 40) ||
                  (selectedAgeRange === '41+' && item.age >= 41)) &&
                (!isAvailableChecked || (isAvailableChecked && item.available === 1))
              );
            })
            .map((player) => (
              <PlayerCard
                key={player.player_id}
                id={player.player_id}
                player_name={player.player_name}
                sport_activity_name={player.sport_activity_name}
                gender={player.gender}
                age={player.age}
                skill_level={player.skill_level}
                available={player.available}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default PlayersPage;
