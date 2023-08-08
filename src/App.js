import { useState } from 'react';
import './App.css';
import { Options } from './components/options/options.component';
import { UserForm } from './components/user-form/user-form.component';
import { Users } from './components/users/users.component';
import '@coreui/coreui/dist/css/coreui.min.css'

const USERS = [{
  name: 'John',
  dob: '05/23/1990',
  country: 0,
  city: 1,
  id: "31231231231"
},{
  name: 'Alex',
  dob: '01/22/1993',
  country: 1,
  city: 1,
  id: "3121231231"
}];

function App() {
  const [showForm, setShowForm ] = useState(false);
  const handleToggle = () => {
    setShowForm(!showForm);
  }
  return (
    <div className="App container">
      <h2 className='header-custom'>User Management</h2>
      {showForm?  
      <UserForm handleToggle={handleToggle} />
      :
      <Options handleToggle={handleToggle} /> 
      }
      <Users users={USERS}  />
    </div>
  );
}

export default App;
