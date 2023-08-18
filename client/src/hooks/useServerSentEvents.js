import {
    useEffect,
    useState
} from 'react';

function useServerSentEvents(url) {
    const [data, setData] = useState([]);

    useEffect(() => {
        const eventSource = new EventSource(url);

        eventSource.onmessage = event => {
            const newComment = JSON.parse(event.data);
            console.log('Received new comment:', newComment);
            setData(prevData => [...prevData, newComment]);
        };

        eventSource.onerror = error => {
            console.error('SSE error:', error);
        };

        return () => {
            eventSource.close();
        };
    }, [url]);

    return data;
}

export default useServerSentEvents;