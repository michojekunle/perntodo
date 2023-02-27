import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();
    const handleLogOut = () => {
        fetch('http://localhost:5002/logout')
        .then(res => res.json())
        .then(async data => {
            console.log(data)
            if(data.msg){
                await localStorage.setItem('user_id', 'null');
                navigate('/signin');
            }
        })
    }
  return (
    <div className='d-flex justify-content-end' style={{width: '100%', paddingBlock: '20px'}}>
        <button className='btn btn-danger' type='button' onClick={handleLogOut}>Log Out</button>
    </div>
  )
}

export default Logout