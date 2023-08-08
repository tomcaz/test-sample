import { useEffect } from 'react';
import './App.css';
import { Options } from './components/options/options.component';
import { UserForm } from './components/user-form/user-form.component';
import { Users } from './components/users/users.component';
import '@coreui/coreui/dist/css/coreui.min.css'
import { useDispatch, useSelector } from 'react-redux';
import { changeFormState, listUsers } from './reducers/user.slice';
import { FORM_STATE } from './global/constants';

function App() {

  const dispatch = useDispatch()
  const users = useSelector(state => state.users.userData)
  useEffect(()=> {
    dispatch(listUsers())
  }, [])

  const formState = useSelector(state=> state.users.formState)

  return (
    <div className="App container">
      <h2 className='header-custom'>User Management</h2>
      {formState === FORM_STATE.DEFAULT?  
      <Options handleToggle={()=> dispatch(changeFormState(FORM_STATE.CREATE))} /> 
      :
      <UserForm handleToggle={()=> dispatch(changeFormState(FORM_STATE.DEFAULT))} />
      }
      <Users users={users}  />
    </div>
  );
}

export default App;
