import React,{ useEffect,useState }  from "react";
import "./Home.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import SpinnerLoader from "../../Components/SpinnerLoader/SpinnerLoader";
import {
  HTTP_SERVICE_CALL,
} from "../../Components/ApiProvider/ApiProvider";

function Home() {
  const [products,setProducts] = useState([]);
  const [loading,setLoading] = useState(false);
  let colorsArr = ["#436B95","#4C516D","#222222","#5D555B","#66AABC","#C17E91","#422518","#C19A6B","#341731","#242124","#6C79B8","#91A3B0"];

  useEffect(()=>{
    getProducts();
  },[])


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
      <Header/>
      <main class="container-fluid">
      <div class="row">
      <div class="col-sm-12 col-md-2 filter_box">
       <span className="filter_heading">Color</span>
       <div className="row row-cols-md-3 row-cols-xl-3 g-2 color_filter">
       {colorsArr.map((element,key)=>(
        <input type="radio" value={element}/>
        ))}
       </div>
       <span className="filter_heading">Price Range</span>
       <div className="row row-cols-3 row-cols-md-3 range_filter">
        <input type="number" className="form-control "/>
        <input type="number" className="form-control "/>
       </div>
      </div>
      <div class="col-sm-12 col-md-10">
       <div class="row search_box">
            <div class="col-sm-12 col-md-6">
            Search
            <input type="text" class="form-control form-control-color" id="exampleColorInput" value="" title="Choose your color"/>
            </div>
          </div>
          {loading && <SpinnerLoader/>}   
          <div class="row row-cols-1 row-cols-md-4 row-cols-xl-4 row-cols-sm-1 g-2">
          {products.map((element,key)=>(
                  <div class="col products">
                    <div class="card">
                      <img src={element.image} class="card-img-top" alt="..."/>
                      <div class="card-body">
                        <h5 class="card-title">{element.title}</h5>
                        <p class="card-text">{element.description}</p>
                      </div>
                    </div>
                  </div>
          ))}
        </div>
      </div>
      </div>
      </main>
     <Footer/>
     </>
  );
}
export default Home;