import './App.css'
import { Outlet } from 'react-router-dom'
// import { useSelector } from 'react-redux';
// import { useEffect } from 'react';
// import { connectSocket , disconnectSocket } from './socketio/connectSocket';

function App() {
  // const token = useSelector((state) => state.auth.token);
  // useEffect(() => {
  //   if (token) {
  //     console.log("Token exists, connecting socket:", token);
  //     connectSocket(token); 
  //   }
  //   else {
  //     disconnectSocket();
  //   }
  //   return () => disconnectSocket();
  // },[token]);

  return (
    <div className="App">
      <Outlet/>
    </div>
  )
}

export default App
