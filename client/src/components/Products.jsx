import React from "react";
import CardProduct from "./CardProduct";
import "./Products.css";

const Products = ({ productosArray }) => {
    // funcion que pinta productos//
    // Paint products list function
    const paintProducts = () => {
        return productosArray.map(producto => (
            <CardProduct key={producto._id} producto={producto} />
        ));
    };

    return <div className="gridContainer">{paintProducts()}</div>;
};

export default Products;
