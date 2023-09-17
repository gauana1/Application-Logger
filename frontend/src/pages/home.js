import {useEffect, useState} from 'react'; 
import { useAppContext } from '../hooks/useAppContext';
import AppDetails from '../components/appDetails'
import AppForm from '../components/appForm'
import { useAuthContext } from '../hooks/useAuthContext';
const Home = () => 
{
    const {user}  = useAuthContext();
    const {apps, dispatch} = useAppContext();
    const [selectedAppIds, setSelectedAppIds] = useState([]);
    useEffect(() => {
        const fetchApps = async () => {
            const response = await fetch('/applications', 
            {
                headers:{
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();
            if(response.ok){
                dispatch({type:'SET_APPLICATIONS', payload:json})
            }
        }
        if(user){
            fetchApps();
        }
       
    },[dispatch, user])
    const handleCheckboxChange = (appId) => {
        // Toggle selection by adding/removing the appId to/from the selectedAppIds array
        if (selectedAppIds.includes(appId)) {
          setSelectedAppIds(selectedAppIds.filter(id => id !== appId));
        } else {
          setSelectedAppIds([...selectedAppIds, appId]);
        }
    }

    const handleClick =  async () =>
    {
        selectedAppIds.map(async (id) => {
            const response = await fetch('/applications/' + id, {
            method:'DELETE',
            headers:{'Authorization': `Bearer ${user.token}`}
            })
            const json = await response.json();
            if(response.ok)
            {
                const index = selectedAppIds.indexOf(id);
                selectedAppIds.splice(index, 1);
                dispatch({type:'DELETE_APP', payload:json})
            }

        })
        
    }
    return (
        <div className="home">
            {selectedAppIds.length > 0 && (
            <>
            <div>
                <button className = "delete-items" onClick = {handleClick}>Delete Selected Items</button>
            </div>
            <br/>
            </>)}
            <table>
                <thead>
                    {apps && <tr className = 'table'>
                        <th>Job Name</th>
                        <th>Position</th>
                        <th>Application Link</th>
                        <th>Status</th>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Select</th>
                    </tr>}
                </thead>
                <tbody>
                    {apps && apps.map((app)=> (
                        <AppDetails 
                        key={app.id}
                        application={app}
                        isSelected={selectedAppIds.includes(app._id)}
                        onCheckboxChange={handleCheckboxChange}
                        />
                    ))}
                </tbody>
            </table>
            
            <AppForm/>
        </div>
    )
}
export default Home; 