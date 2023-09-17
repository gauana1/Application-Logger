import { useAppContext } from "../hooks/useAppContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from 'react';
const AppDetails = ({application, isSelected, onCheckboxChange}) => {
    const {user} = useAuthContext();
    const {dispatch} = useAppContext();
    const [checkbox, setCheckbox] = useState(false);
    return ( 
        <tr className="App-Details">
            <td>{application.jobName}</td>
            <td>{application.position}</td>
            <td><a href={application.applicationLink}>{application.applicationLink}</a></td>
            <td>{application.status}</td>
            <td>{application.username}</td>
            <td>{application.password}</td>
            <td><input type="checkbox" onChange={() => onCheckboxChange(application._id)} checked = {isSelected}/></td>
            {/* <td><span onClick={handleClick}>delete</span></td> */}
            
        </tr>
     ); 
}
 
export default AppDetails;  