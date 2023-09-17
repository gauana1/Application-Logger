import {useState} from 'react'; 
import { useAppContext } from '../hooks/useAppContext';
import { useAuthContext } from '../hooks/useAuthContext';

const AppForm = () => {
    const {dispatch} = useAppContext();
    const [jobName, setJobName] = useState('')
    const[position, setPosition] = useState('');
    const[link, setLink] = useState('');
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    const[notes, setNotes] = useState('');
    const[status, setStatus] = useState('No Status');
    const[error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);
    const {user} = useAuthContext();
    const handleSubmit = async(e) => {
        e.preventDefault();

        if(!user){
            setError("You must be Logged In");
            return;
        }

        const app = {jobName, position, applicationLink:link, username, password, notes, status};
        console.log(link)
        const response  = await fetch('/applications', {
            method:'POST',
            body: JSON.stringify(app),
            headers:{'Content-Type':'application/json', 'Authorization': `Bearer ${user.token}`}
            
        })
        const json  = await response.json();
        if(!response.ok)
        {
            console.log(json.error);
            setError(json.error);
            setEmptyFields(json.emptyFields);
        }
        if(response.ok)
        {
            setJobName('');
            setPosition('');
            setLink('');
            setUsername('');
            setPassword('');
            setNotes('');
            setStatus('No Status');
            setError(null);
            setEmptyFields([]);
            dispatch({type:'CREATE_APPLICATION', payload:json});
            console.log("new app added");
        }
    }
    return ( 
        <form className="create" onSubmit = {handleSubmit}>
            <h3>Add a new Application</h3>

            <label>Job Name:</label>
            <input
                type = "text"
                onChange ={(e) => setJobName(e.target.value)}
                value = {jobName}  
                className = {emptyFields.includes('Job Name') ? 'error':''}
            />
            <label>Job Position:</label>
            <input
                type = "text"
                onChange ={(e) => setPosition(e.target.value)}
                value = {position}  
                className = {emptyFields.includes('Position') ? 'error':''}
            />
            <label>Application Link:</label>
            <input
                type = "text"
                onChange ={(e) => setLink(e.target.value)}
                value = {link}  
                className = {emptyFields.includes('Application Link') ? 'error':''}
            />
            <label>Status:</label>
            <select    
                onChange = {(e) => setStatus(e.target.value)}
                value = {status}
                className = {emptyFields.includes('Status') ? 'error':''}
            >
                <option  value="No Status">No Status</option>
                <option value="Rejected">Rejected</option>
                <option value="Coding Challenge">Coding Challenge</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
            </select>
            <label>Username:</label>
            <input
                type = "text"
                onChange ={(e) => setUsername(e.target.value)}
                value = {username}  
            />
            <label>Password:</label>
            <input
                type = "text"
                onChange ={(e) => setPassword(e.target.value)}
                value = {password}  
            />
            <label>Notes:</label>
            <input
                type = "text"
                onChange ={(e) => setNotes(e.target.value)}
                value = {notes}  
            />

            <button>Add Application</button>
            {error && <div className="error">{error}</div>}
        </form>
        

    );
}
 
export default AppForm;