import { useEffect, useState } from 'react';
import './App.css';
import { Options } from './components/options/options.component';
import { UserForm } from './components/user-form/user-form.component';
import { Users } from './components/users/users.component';
import '@coreui/coreui/dist/css/coreui.min.css'
import { useDispatch, useSelector } from 'react-redux';
import { changeFormState, fetchUsers, listUsers } from './reducers/user.slice';
import { FETCH_STATUS, FORM_STATE } from './global/constants';
import { CToast, CToastBody, CToastClose } from '@coreui/react';

function App() {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users.userData)
  const fetchStatus = useSelector(state => state.users.fetchStatus); 
  const error = useSelector(state => state.users.error); 
  useEffect(()=> { 
    if (fetchStatus === FETCH_STATUS.IDLE) {
      dispatch(fetchUsers());
    }
    
  }, [fetchStatus, dispatch]);

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
      <CToast autohide={false} visible={fetchStatus === FETCH_STATUS.LOADING} className="toast align-items-center">
        <div className="d-flex">
          <CToastBody>Loading ... </CToastBody>
          <CToastClose className="me-2 m-auto" />
        </div>
      </CToast>
    </div>
  );
}

export default App;
