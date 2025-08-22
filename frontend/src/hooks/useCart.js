import axios from "axios";
import { useState } from "react";

export function useCart(){
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false); 

    const fetchCart = async() => {
        try{
            const response = await axios.get(`http://localhost:3000/api/cart/${userId}`, {
                headers:{
                    "Authorization": `Bearer: ${localStorage.getItem('token')}`
                }
            });
            alert('Producto agregado')
        }catch(error){

        }
    }
}