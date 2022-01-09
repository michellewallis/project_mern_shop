import React from "react";
import accounting from "accounting";

const CardProduct = ({ producto }) => {
    const {
        name,
        price,
        img,
        rating,
        manufacturer: { nombre, direccion, cif },
    } = producto;

    return (
        <div className="card text-white bg-primary mb-3">
            <div className="card-body">
                <h4 className="card-title text-uppercase">{name}</h4>
                <img className="img-fluid mb-4"src={img} alt="" />
                <p className="card-text">
                    {accounting.formatMoney(price, "€", 2, ".", ",")}
                </p>
                <p className="card-text">Puntuación:{rating}</p>
                <p className="card-text">Fabricante:{nombre}</p>
                <p className="card-text"> Dirección:{direccion}</p>
                <p className="card-text">{cif}</p>
            </div>
        </div>
    );
};

export default CardProduct;
