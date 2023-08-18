import {
    useState,
    useEffect
} from 'react';
import axios from 'axios';
import {
    useToast
} from '@chakra-ui/react';

const useLogout = () => {
    const [loading, setLoading] = useState(true);
    const toast = useToast();

    useEffect(() => {
        const logout = async () => {
            try {
                const response = await axios.post('/api/logout');

                if (response.status === 200) {
                    window.location.href = '/';
                }
            } catch (error) {
                toast({
                    title: 'Logout Failed',
                    description: 'An error occurred during logout. Please try again.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
            setLoading(false);
        };

        logout();
    }, [toast]);

    return loading;
};

export default useLogout;