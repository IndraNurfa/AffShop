import axios from "axios";
import {
    useEffect,
    useState
} from "react"

const useProduct = (videoId) => {
    const [product, setProduct] = useState();

    useEffect(() => {
        axios.get(`/api/getProduct/${videoId}`)
            .then(response => {
                setProduct(response.data);
            })
            .catch(error => {
                console.error('Error fetching product:', error);
            })
    }, [videoId]);

    return product;

}

export default useProduct;