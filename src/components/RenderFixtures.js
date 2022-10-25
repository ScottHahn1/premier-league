import React from 'react';
import { useEffect, useState } from 'react';

const RenderFixtures = ({ sortByTime, teams, loading, setLoading }) => {
    const [fixtures, setFixtures] = useState([]);
    const [newFixtures, setNewFixtures] = useState([]);

    useEffect(() => {
        sortByTime.length && sortByTime.map((item, index) => {
            fixtures.length !== sortByTime.length && setFixtures( prev => [...prev, index]);
            fixtures.length && setNewFixtures([...new Set(fixtures)]);
        })
    }, [sortByTime]);

    useEffect(() => {
        teams.length && setLoading(false)
    });

    return (
        loading === false ? 
        newFixtures.length > 0 && 
        newFixtures.map((item, index) =>
            <div key={index} className='fixtures'>
                <h1 id='fixture-date'>{sortByTime[index][0].date.toDateString()}</h1>
                { sortByTime[index].map((item, index) => (
                    <div key={`${index} ${index += 1}`} className='fixtures-container'>
                        <p key={`${index} ${index += 2}`}>
                            {item.homeTeam}
                        </p>
                        { 
                            teams.filter(team => team.name === item.homeTeam)
                            .map(team => <img key={`${index} ${index += 3}`} className='home-badge' src={team.badge} /> ) 
                        }
                        <p key={`${index} ${index += 4}`}> 
                            { Array.from(item.time).slice(0, 5) } 
                        </p>
                        { 
                            teams.filter(team => team.name === item.awayTeam)
                            .map(team => <img key={`${index} ${index += 5}`} className='away-badge' src={team.badge} /> ) 
                        }
                        <p key={`${index} ${index += 6}`}>
                            {item.awayTeam}
                        </p>
                        <img key={`${index} ${index += 7}`} 
                            width='50px' src='https://cdn4.iconfinder.com/data/icons/buildings-and-structures-3/512/sports___stadium_soccer_football_fitness_building.png' 
                        />
                        <p key={`${index} ${index += 8}`}>
                            {item.venue}
                        </p>
                    </div>
                ))}
            </div>
        )
        : 
        <div className='loading-container'>
            <div className='loading'></div>
        </div> 
    )
};

export default RenderFixtures;