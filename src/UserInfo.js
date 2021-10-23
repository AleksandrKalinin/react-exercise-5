import { Fragment, useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function UserInfo(props) {

  const userData = useSelector(state => state.userReducer.user);

  const [isOpen, setVisibility] = useState(false);

  const [data, setData] = useState(userData)

  useEffect(() => {
    setData(userData);
  }, [userData])

  function changeVisibility() {
    setVisibility(!isOpen);
  }

  return (
    <div>    
      <p><span className="bold">Name: </span>{data.name}</p>
      <p><span className="bold">Username: </span>{data.username}</p>
      <p><span className="bold">Email: </span>{data.email}</p>
      {isOpen ?
        <>
          <p><span className="bold">Phone </span>{data.phone}</p>
          <p><span className="bold">Website: </span>{data.website}</p>
          <p><span className="bold">City: </span>{data.address.city}</p>
          <p><span className="bold">Address: </span>{data.address.street}</p>
        </>
      : null}
      <Button onClick = {changeVisibility}>{isOpen ? 'Less information' : 'More information' }</Button>
    </div>
  );
}

export default UserInfo;
