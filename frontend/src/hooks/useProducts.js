import { useState, useEffect } from "react";
import { getAllProducts } from "../services/api";

export function useProducts(){
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getAllProducts()
         .then(setProducts)
         .catch(() => setError('Error al cargar los productos'))
         .finally(() => setLoading(false))
    }, []);
    return { products, error, loading};
}

