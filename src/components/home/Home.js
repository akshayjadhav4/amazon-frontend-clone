import React, { useState, useEffect } from "react";
import "./Home.css";
import Product from "../product/Product";
import { db } from "../../firebase/Firebase";
import { useStateValue } from "../../contextApi/StateProvider";
import { CircularProgress } from "@material-ui/core";

function Home() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [{ search }] = useStateValue();

  useEffect(() => {
    setIsLoading(true);
    db.collection("products").onSnapshot((snapshot) => {
      setProducts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
      setIsLoading(false);
    });
  }, []);

  const checkProductAvailable = products.filter((item) => {
    if (!search) return true;
    if (item.data.title.toUpperCase().includes(search.toUpperCase())) {
      return true;
    }
    return false;
  });

  return (
    <div className="home">
      <img
        className="home__image"
        src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
        alt=""
      />
      {isLoading ? (
        <div className="home__loader">
          <CircularProgress />
        </div>
      ) : (
        <div className="home__row">
          {checkProductAvailable.length > 0 ? (
            checkProductAvailable.map((product) => (
              <Product
                key={product.id}
                id={product.id}
                image={product.data.image}
                price={product.data.price}
                rating={product.data.rating}
                title={product.data.title}
              />
            ))
          ) : (
            <h1
              style={{
                color: "black",
                margin: "auto",
              }}
            >
              No product found.
            </h1>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
