import {
    useState,
    useEffect
} from 'react';
import axios from 'axios';

const useSession = () => {
    const [session, setSession] = useState(null);

    useEffect(() => {
        axios.get('/api/getSession', {
                withCredentials: true,
            })
            .then(response => {
                setSession(response.data);
            })
            .catch(error => {
                console.error('Error fetching session:', error);
            });
    }, []);

    return session;
};

export default useSession;