import React, { forwardRef, ForwardRefRenderFunction, useState } from 'react';
import '../../Styles/FilterList.css';
import UserDetails from '../../UsersData/UsersData.json';

interface UserDetaisTypes {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  ip_address: string;
  status: string;
}

const FilterList: ForwardRefRenderFunction<HTMLDivElement, {}> = (props, ref) => {

  const [Details, setDetails] = useState<Array<UserDetaisTypes>>([]);
  const [SelectRow, setSelectRow] = useState<UserDetaisTypes | undefined>();
  const [PendingDetails, setPendingDetails] = useState<Array<UserDetaisTypes>>([]);

  const ShowUserDetails = () => {
    setDetails(UserDetails as UserDetaisTypes[]);
  }

  const HandelEnableButton = () => {
    if (SelectRow) {
      // Add the selected row with the updated status to pendingDetails
      setPendingDetails(prevPendingDetails => [...prevPendingDetails, { ...SelectRow, status: 'Enable' }]);
    }
  }

  const HandelDisableButton = () => {
    if (SelectRow) {
      setPendingDetails(prevPendingDetails => [...prevPendingDetails, { ...SelectRow, status: 'Disable' }]);
      // No need to add to pendingDetails for Disable, as it's immediately applied to the selected row
    }
  }

  const HandelRemoveButton = () => {
    // Implement logic to remove the selected row (SelectRow) from the list
    if (SelectRow) {
      setDetails(prevDetails => prevDetails.filter(user => user.id !== SelectRow.id));
      setSelectRow(undefined);
    }
  }

  const HandelSaveButton = () => {
    // Apply pending changes to the main Details state
    setDetails(prevDetails => {
      // Create a copy of the current details
      let updatedDetails = [...prevDetails];

      // Apply pending changes to the copy
      PendingDetails.forEach(pendingUser => {
        const index = updatedDetails.findIndex(user => user.id === pendingUser.id);
        if (index !== -1) {
          updatedDetails[index] = { ...pendingUser };
        }
      });

      return updatedDetails;
    });

    // Clear pending changes after saving
    setPendingDetails([]);
  }

  const HandelSelectRow = (user: UserDetaisTypes) => {
    setSelectRow(user);
  }

  console.log("User: ", SelectRow);

  return (
    <div className='filter-list' ref={ref as React.RefObject<HTMLDivElement>}>
      <div>
        <div className='show-button-posittion'>
          <button className='show-data' onClick={ShowUserDetails}>User List</button>
        </div>
        <div className='table-alighment'>
          {Details && Details.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>No</th>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {Details.map((user, index) => (
                  <tr
                    key={user.id}
                    className='row-data'
                    onClick={() => HandelSelectRow(user)}
                  >
                    <td>{index + 1}</td>
                    <td>{user.id}</td>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td>{user.email}</td>
                    <td>{user.status != null ? user.status : "Set Status"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : " "}
          {Details && Details.length > 0 ? (
            <div className='change-status'>
              <div>
                <button type='button' className='enable' onClick={HandelEnableButton}>Enable</button>
              </div>
              <div>
                <button type='button' className='disable' onClick={HandelDisableButton}>Disable</button>
              </div>
              <div>
                <button type='button' className='remove' onClick={HandelRemoveButton}>Remove</button>
              </div>
              <div>
                <button type='button' className='save' onClick={HandelSaveButton}>Save</button>
              </div>
            </div>
          ) : " "}
        </div>
      </div>
    </div>
  );
};

export default forwardRef(FilterList);
