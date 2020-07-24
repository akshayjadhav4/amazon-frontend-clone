import React from "react";
import './Home.css'
import Product from "../product/Product";
function Home() {
  return (
    <div className="home">
      <img
        className="home__image"
        src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
        alt=""
      />
      <div className="home__row">
        <Product
          id="123"
          image="https://images-na.ssl-images-amazon.com/images/I/5103Xi7yQgL._SX679_.jpg"
          price={" 62,900"}
          rating={4}
          title="Apple iPhone 11 (128GB) - Black"
        />
        <Product
          id="101"
          image="https://images-na.ssl-images-amazon.com/images/I/51iYAkshPAL._SX410_BO1,204,203,200_.jpg"
          price={" 2,996.00"}
          rating={5}
          title="The Witcher Boxed Set: Blood of Elves, The Time of Contempt, Baptism of Fire Paperback – 3 October 2017"
        />
      </div>

      <div className="home__row">
        <Product
          id="789"
          image="https://images-na.ssl-images-amazon.com/images/I/819DdWLncEL._UX569_.jpg"
          price={" 649.00 - ₹ 898.00"}
          rating={3}
          title="Puma Men's Regular fit Active Base Layer T-Shirt"
        />
        <Product
          id="123"
          image="https://images-na.ssl-images-amazon.com/images/I/71kwtkte06L._UL1500_.jpg"
          price={" 1,749.00 - ₹ 2,099.00"}
          rating={4}
          title="Reebok Men's Identity Slipon Training Shoes"
        />

        <Product
          id="456"
          image="https://images-na.ssl-images-amazon.com/images/I/71znGoLL%2B4L._SL1500_.jpg"
          price={" 73,600.00"}
          rating={4}
          title="Samsung Galaxy Note 10 (Aura Black, 8GB RAM, 256GB Storage) with No Cost EMI/Additional Exchange Offers"
        />
      </div>

      <div className="home__row">
        <Product
          id="121"
          image="https://www.amazon.com/images/I/810s87wc61L._AC_SL1500_.jpg"
          price={" 1,12,230.66"}
          rating={4}
          title="SAMSUNG 32-inch Odyssey G7 – QHD 1000R Curved Gaming Monitor 240hz,1ms, Gsync & Freesync, QLED (LC32G75TQSNXZA), Black, 32 Inches"
        />
      </div>
    </div>
  );
}

export default Home;
