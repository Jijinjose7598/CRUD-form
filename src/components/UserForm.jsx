import { useState, useEffect } from 'react';
import axios from 'axios';
import '../style.css';

function UserForm() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ id: null, name: '', username: '', email: '', address: { street: '', city: '', zipcode: '' }, phone: '', website: '', company: { name: '' } });
  const [isEditing, setIsEditing] = useState(false);

  const apiURL = 'https://jsonplaceholder.typicode.com/users';

  useEffect(() => {
    axios.get(apiURL)
      .then(response => setUsers(response.data))
      .catch(error => console.log('Error fetching data:', error));
  }, []);

  function handleInputChange(e) {
    const { name, value } = e.target;
    const nameParts = name.split('.');
    if (nameParts.length > 1) {
      setNewUser({ ...newUser, [nameParts[0]]: { ...newUser[nameParts[0]], [nameParts[1]]: value } });
    } else {
      setNewUser({ ...newUser, [name]: value });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (isEditing) {
      const updatedUsers = users.map((user) => (user.id === newUser.id ? newUser : user));
      setUsers(updatedUsers);
      resetForm();
    } else {
      const newUserWithId = { ...newUser, id: users.length + 1 };
      setUsers([...users, newUserWithId]);
      resetForm();
    }
  }

  function handleEditUser(id) {
    const userToEdit = users.find(user => user.id === id);
    setNewUser(userToEdit);
    setIsEditing(true);
  }

  function handleDeleteUser(id) {
    const filteredUsers = users.filter(user => user.id !== id);
    setUsers(filteredUsers);
  }

  function resetForm() {
    setNewUser({ id: null, name: '', username: '', email: '', address: { street: '', city: '', zipcode: '' }, phone: '', website: '', company: { name: '' } });
    setIsEditing(false);
  }

  return (
    <div>
      <div className='form-container'>
        <h1>User List</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" name="name" value={newUser.name} onChange={handleInputChange} placeholder="Enter Name" />
          </div>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">User Name</label>
            <input type="text" className="form-control" id="username" name="username" value={newUser.username} onChange={handleInputChange} placeholder="Enter User Name" />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name="email" value={newUser.email} onChange={handleInputChange} placeholder="Enter Email" />
          </div>
          <div className="mb-3">
            <label htmlFor="street" className="form-label">Address Line 1</label>
            <input type="text" className="form-control" id="street" name="address.street" value={newUser.address.street} onChange={handleInputChange} placeholder="Enter street" />
          </div>
          <div className="mb-3">
            <label htmlFor="city" className="form-label">Address Line 2</label>
            <input type="text" className="form-control" id="city" name="address.city" value={newUser.address.city} onChange={handleInputChange} placeholder="Enter city" />
          </div>
          <div className="mb-3">
            <label htmlFor="zipcode" className="form-label">Zip Code</label>
            <input type="text" className="form-control" id="zipcode" name="address.zipcode" value={newUser.address.zipcode} onChange={handleInputChange} placeholder="Enter Zip Code" />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Phone Number</label>
            <input type="text" className="form-control" id="phone" name="phone" value={newUser.phone} onChange={handleInputChange} placeholder="Enter Phone Number" />
          </div>
          <div className="mb-3">
            <label htmlFor="website" className="form-label">Website</label>
            <input type="text" className="form-control" id="website" name="website" value={newUser.website} onChange={handleInputChange} placeholder="Enter Website" />
          </div>
          <div className="mb-3">
            <label htmlFor="companyName" className="form-label">Company Name</label>
            <input type="text" className="form-control" id="companyName" name="company.name" value={newUser.company.name} onChange={handleInputChange} placeholder="Enter Company Name" />
          </div>
          <div className='btn-form'>
            <button type="submit" className="btn btn-primary">{isEditing ? 'Update Person' : 'Add Person'}</button>
          </div>
        </form>
      </div>

      <div className='content-table'>
        <table className="table table-dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">User Name</th>
              <th scope="col">Email</th>
              <th scope="col">Street</th>
              <th scope="col">City</th>
              <th scope="col">Zip Code</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Website</th>
              <th scope="col">Company Name</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <th scope="row">{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.address.street}</td>
                <td>{user.address.city}</td>
                <td>{user.address.zipcode}</td>
                <td>{user.phone}</td>
                <td>{user.website}</td>
                <td>{user.company.name}</td>
                <td>
                  <button className="btn btn-warning" onClick={() => handleEditUser(user.id)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => handleDeleteUser(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserForm;
