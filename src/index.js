import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import Users from './Users';
import Vacations from './Vacations';
import Places from './Places';
import VacationForm from './VacationForm';

const App = ()=> {

  const [users, setUsers] = useState([])
  const [places, setPlaces] = useState([])
  const [vacations, setVacations] = useState([])

  useEffect(() => {
    const fetchUsers = async() => {
      const response = await axios.get('/api/users')
      setUsers(response.data)
    }
    fetchUsers()
  }, [])

  useEffect(() => {
    const fetchPlaces = async() => {
      const response = await axios.get('/api/places')
      setPlaces(response.data)
    }
    fetchPlaces()
  }, [])

  useEffect(() => {
    const fetchVacations = async() => {
      const response = await axios.get('/api/vacations')
      setVacations(response.data)
    }
    fetchVacations()
  }, [])

  const bookVacation = async(vacation) => {
    const response = await axios.post('/api/vacations', vacation)
    console.log(response.data)
    setVacations([...vacations, response.data])

  }

  const cancelVacation = async(vacation) => {
    await axios.delete(`/api/vacations/${vacation.id}`)
    setVacations(vacations.filter((_vacation) => {return _vacation.id !== vacation.id}))
  }

  return (
    <div>
      <h1>Vacation Planner</h1>
      <VacationForm users={users} places={places} bookVacation={bookVacation}/>
      <div className='container'>
        <Vacations vacations={vacations} places={places} cancelVacation={cancelVacation} users={users}/>
        <Users users={users} vacations={vacations}/>
        <Places places={places} vacations={vacations}/>
      </div>

    </div>
  );
};

const root = ReactDOM.createRoot(document.querySelector('#root'));

root.render(<App />);
