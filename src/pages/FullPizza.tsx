 import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
const FullPizza: React.FC = () => {
  const { id } = useParams();
  const [pizza, setPizza] = React.useState<{
    imageUrl:string;
    title:string;
    price:number;
  }>();
  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          "https://647f47e6c246f166da907d09.mockapi.io/pizzas/" + id
        );
        setPizza(data);
      } catch (error) {
        console.log(error);
      } 
    }
    fetchPizza();
  }, []);

  if (!pizza){ // это необходимо, ьез этой проверки не будет рендера так как ppizza undefiend
    return <>Loading...</>
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} </h4>
    </div>
  );
};

export default FullPizza;
