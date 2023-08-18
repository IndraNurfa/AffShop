import {
    useEffect,
    useState
} from 'react';
import axios from 'axios';

const useProfile = () => {
    const [profile, setProfile] = useState('');

    useEffect(() => {
        axios.get('/api/getProfile', {
                withCredentials: true,
            })
            .then(response => {
                setProfile(response.data);
            })
            .catch(error => {
                console.error('Error fetching session:', error);
            });
    }, []);

    return profile;
}

export default useProfile;