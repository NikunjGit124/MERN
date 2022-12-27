import React, { useEffect, useState } from "react";
import "./Home.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import SpinnerLoader from "../../Components/SpinnerLoader/SpinnerLoader";
import { HTTP_SERVICE_CALL } from "../../Components/ApiProvider/ApiProvider";
function Home() {
  const [products, setProducts] = useState([]);
  const [searchvalue, setSearchvalue] = useState("");
  const [loading, setLoading] = useState(false);
  let colorsArr = ["#436B95", "#4C516D", "#222222", "#5D555B", "#66AABC", "#C17E91", "#422518", "#C19A6B", "#341731", "#242124", "#6C79B8", "#91A3B0"];
  let BrandsArr = ["Nike", "Puma", "Addidas"];

  useEffect(() => {
    getProducts();
  }, [])

  const getProducts = async () => {
    setLoading(true);
    try {
      let response = await HTTP_SERVICE_CALL(
        "https://fakestoreapi.com/products",
        "GET",
        {},
        ""
      );
      if (response && (response.status === 200)) {
        setProducts(response.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  return (
    <>
      <Header />
      <main className="container-fluid">
        <div className="row">
          <div className="col-sm-12 col-md-2 filter_box">
            <span className="filter_heading">Color</span>
            <div className="row row-cols-md-3 row-cols-xl-3 g-2 color_filter">
              {colorsArr.map((element, key) => (
                <input
                  key={"color" + key}
                  className="form-check-input"
                  type="checkbox"
                  name="exampleRadios"
                  id="exampleRadios1"
                  style={{ backgroundColor: element }}
                />
              ))}
            </div>
            <span className="filter_heading">Brands</span>
            <div className="row row-cols-md-1 row-cols-xl-1 g-2 ">
              {BrandsArr.map((element, key) => (
                <div className="form-check brand_filter" key={"brand" + key}>
                  <input className="form-check-input" type="checkbox" value={element} id={"brands" + key} />
                  <label className="form-check-label" htmlFor={"brands" + key}>
                   {element}
                  </label>
                </div>
              ))}
            </div>
            <span className="filter_heading">Price Range</span>
            <div className="row row-cols-3 row-cols-md-3 range_filter mb-3">
              <input type="number" className="form-control " />
              <input type="number" className="form-control " />
            </div>
          </div>
          <div className="col-sm-12 col-md-10 mb-5 pb-3">
            <div className="row search_box">
              <div className="col-sm-12 col-md-6">
                <input type="text" placeholder="Search.." className="form-control form-control-color" id="exampleColorInput" onChange={(e) => { setSearchvalue(e.target.value) }} value={searchvalue} title="Choose your color" />
              </div>
            </div>
            {loading && <SpinnerLoader />}
            <div className="row row-cols-1 row-cols-md-4 row-cols-xl-4 row-cols-sm-1 g-2">
              {products.map((element, key) => (
                <div className="col products" key={"product" + key}>
                  <div className="card">
                    <img src={element.image} className="card-img-top" alt="..." />
                    <div className="card-body">
                      <h5 className="card-title">{element.title}</h5>
                      <p className="card-text">{element.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
export default Home;