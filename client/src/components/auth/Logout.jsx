import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../constant';


const Logout = () => {
    const navigate = useNavigate();
    const handleLogOut = () => {
        fetch(`${BASE_URL}/logout`)
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