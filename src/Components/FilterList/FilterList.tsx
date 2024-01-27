import React, { forwardRef, ForwardRefRenderFunction, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
  const [ShowContent,setShowContent] = useState<boolean>(false);
  const [UnsaveedChanges,setUnsaveChanges] = useState<boolean>(false);

  const ShowUserDetails = () => {
    setDetails(UserDetails as UserDetaisTypes[]);
    setUnsaveChanges(false);
    setShowContent(true);
  }

  const HandelEnableButton = () => {
    if (SelectRow) {
      setDetails(prevDetails => prevDetails.map(user =>
        user.id === SelectRow.id ? { ...user, status: 'Enable' } : user
      ));
      setUnsaveChanges(true);
      showToast('Enabled successfully!', 'enable');
    }
    else{
      showToast('Select User before click Enable button', 'enable-non');
    }
  }

  const HandelDisableButton = () => {
    if (SelectRow) {
      setDetails(prevDetails => prevDetails.map(user =>
        user.id === SelectRow.id ? { ...user, status: 'Disable' } : user
      ));
      setUnsaveChanges(true);
      showToast('Disabled successfully!', 'disable');
    }
    else{
      showToast('Select User before click Disable button', 'disable-non');
    }
  }

  const HandelRemoveButton = () => {
    if (SelectRow) {
      setDetails(prevDetails => prevDetails.filter(user => user.id !== SelectRow.id));
      setSelectRow(undefined);
      setUnsaveChanges(true);
      showToast('Removed successfully!', 'remove');
    }
    else{
      showToast('Select User before click Remove button', 'remove-non');
    }
  }

  const HandelSaveButton = () => {
    if(UnsaveedChanges){
      showToast('Data Save Successfully!', 'save');
      setUnsaveChanges(false);
    }else{
      showToast('Change related data before clicking Save button', 'save-non');
    }
    
  }

  const showToast = (message: string, action: 'enable' | 'disable' | 'remove' | 'save' | 'enable-non' | 'disable-non' | 'remove-non' | 'save-non') => {

    const toastOptions = {
      autoClose: 2000
    };

    switch (action) {
      case 'enable':
        toast.success(message, {
          ...toastOptions,
          position: 'top-right',
          className: 'toast-success'
        });
        break;

      case 'disable':
        toast.info(message, {
         ...toastOptions,
         position: 'top-right',
          className: 'toast-info'
        });
        break; 
      
        case 'remove':
          toast.error(message, {
            ...toastOptions,
            position: 'bottom-right',
            className: 'toast-error',
          });
          break;

        case 'save':
          toast.success(message, {
            ...toastOptions,
            position: 'bottom-right',
            className: 'toast-save',
          });
          break;
        
          case 'enable-non':
            toast.warning(message, {
              ...toastOptions,
              position: 'bottom-right',
              className: 'toast-enable-non',
            });
            break;
            case 'disable-non':
              toast.warning(message, {
                ...toastOptions,
                position: 'bottom-right',
                className: 'toast-disable-non',
              });
              break;
              case 'remove-non':
                toast.warning(message, {
                  ...toastOptions,
                  position: 'bottom-right',
                  className: 'toast-remove-non',
                });
                break;

                case 'save-non':
                  toast.warning(message, {
                    ...toastOptions,
                    position: 'bottom-right',
                    className: 'toast-save-non',
                  });
                  break;
        default:
          break;  
    }
  }
  const HandelSelectRow = (user: UserDetaisTypes) => {
    setSelectRow(user);
  }

  return (
    <div className={`filter-list ${ShowContent ? 'user-list-visible' : ''}`} ref={ref as React.RefObject<HTMLDivElement>}>
      <div>
        <div className='show-button-posittion'>
          <button className='show-data' onClick={ShowUserDetails}>User List</button>
        </div>
        <div className='content-area'>
          <div className='table-alighment'>
            {ShowContent && Details && Details.length > 0 ? (
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
                  {ShowContent && Details.map((user, index) => (
                    <tr
                      key={user.id}
                      className={`row-data ${user.id === SelectRow?.id ? 'selected-row' : ''}`}
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
            {ShowContent && Details && Details.length > 0 ? (
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
      <ToastContainer />
    </div>
  );
};

export default forwardRef(FilterList);
