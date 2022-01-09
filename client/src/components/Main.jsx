import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "./Form";
import "./Main.css";
import Products from "./Products";

const Main = () => {
    //estados//

    const [producto, setProducto] = useState(""); // el estado palabra que capta el input keyword
    const [productosArray, setProductosArray] = useState([]); //almacenar productos
    const [pagina, setPagina] = useState(1); // estado pagina empieza en 1
    const [ordenar, setOrdenar] = useState("name"); // ordena por nombre sort

    useEffect(() => {
        const getProducts = async () => {
            try {
                if (!producto) {
                    const resp = await axios.get(
                        `/api/products?page=${pagina}&sort=${ordenar}`
                    );
                    const data = resp.data.data.products; //
                    setProductosArray(data);
                } else {
                    const resp = await axios.get(
                        `/api/products?name=${producto}`
                    );
                    const data = resp.data.data.products;
                    setProductosArray(data);
                }
            } catch (error) {
                console.log(error);
            }
        };
        getProducts();
    }, [producto, pagina, ordenar]);

    // funcion de paginacion//

    const sigPagina = () => {
        const nuevaPagina = pagina + 1; // se activa cuando se de click al boton el que llama a la funcion
        setPagina(nuevaPagina);
    };

    const antPagina = () => {
        const nuevaPagina = pagina - 1;
        setPagina(nuevaPagina);
    };

    const pag1 = () => {
        setPagina(1);
    };

    const pag2 = () => {
        setPagina(2);
    };

    const pag3 = () => {
        setPagina(3);
    };

    // funcion para ordenar//

    //por precio//

    const ordPrecio = () => {
        if (ordenar === "price") {
            setOrdenar("-price")   // escribe en el endpoint
            
        } else {
            setOrdenar("price")
        }
    }

    const ordPuntuacion = () => {
        if (ordenar === "rating") {
            setOrdenar("-rating")   // escribe en el endpoint
            
        } else {
            setOrdenar("rating")
        }
    }




    return (
        <main>
            <div className="containerHero"></div>
            <Form setProducto={setProducto} />
            <div className="d-flex justify-content-center gap-4 mb-5 mt-5">
                <button type="button" class="btn btn-info" onClick={ordPrecio}>
                    Precio
                </button>
                <button type="button" class="btn btn-info" onClick={ordPuntuacion}>
                    Puntuacion
                </button>
            </div>
            <div className="row justify-content-center">
                <Products productosArray={productosArray} />
            </div>
            <div className="d-flex justify-content-center mt-5">
                <ul className="pagination">
                    <li
                        className={`page-item ${
                            pagina === 1 ? "disabled" : null
                        }`}
                    >
                        <button className="page-link" onClick={antPagina}>
                            &laquo;
                        </button>
                    </li>
                    <li className={`page-item ${
                            pagina === 1 ? "active" : null
                        }`}>
                        <button className="page-link" onClick={pag1}>
                            1
                        </button>
                    </li>
                    <li className={`page-item ${
                            pagina === 2 ? "active" : null
                        }`}>
                        <button className="page-link" onClick={pag2}>
                            2
                        </button>
                    </li>
                    <li className={`page-item ${
                            pagina === 3 ? "active" : null
                        }`}>
                        <button className="page-link" onClick={pag3}>
                            3
                        </button>
                    </li>

                    <li
                        className={`page-item ${
                            pagina === 3 ? "disabled" : null
                        }`}
                    >
                        <button className="page-link" onClick={sigPagina}>
                            &raquo;
                        </button>
                    </li>
                </ul>
            </div>
        </main>
    );
};

export default Main;
