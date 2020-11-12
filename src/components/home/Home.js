import React, { useState, useEffect } from "react";
import "./Home.css";
import Product from "../product/Product";
import { db } from "../../firebase/Firebase";
import { useStateValue } from "../../contextApi/StateProvider";

function Home() {
  const [products, setProducts] = useState([]);
  const [{ search }] = useStateValue();

  useEffect(() => {
    db.collection("products").onSnapshot((snapshot) => {
      setProducts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  return (
    <div className="home">
      <img
        className="home__image"
        src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
        alt=""
      />
      <div className="home__row">
        {products &&
          products
            .filter((item) => {
              if (!search) return true;
              if (
                item.data.title.toUpperCase().includes(search.toUpperCase())
              ) {
                return true;
              }
              return false;
            })
            .map((product) => (
              <Product
                key={product.id}
                id={product.id}
                image={product.data.image}
                price={product.data.price}
                rating={product.data.rating}
                title={product.data.title}
              />
            ))}
      </div>
    </div>
  );
}

export default Home;
