import { useState, useEffect } from "react";
// import Spinner from "../components/Spinner";
// import Product from "../components/Product";
import imageLady from "../assets/machines/homepageLady.webp";
import grinder1 from "../assets/machines/grinder1.webp";
import grinder2 from "../assets/machines/grinder2.webp";
import grinder3 from "../assets/machines/grinder3.webp";
import Card from "../components/Card";
import routine from "../assets/machines/routine.webp";
import taste from "../assets/machines/taset.webp";
import EnjoyLife from "../assets/machines/enjoy life.webp"
import compare from "../assets/machines/compare.webp"

const Home = () => {
  const API_URL = "https://fakestoreapi.com/products";
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  async function fetchProductData() {
    setLoading(true);

    try{
      const res = await fetch(API_URL);
      const data = await res.json();

      setPosts(data);
    }
    catch(error) {
      console.log("Error aagya ji");
      setPosts([]);
    }
    setLoading(false);
  }

  useEffect( () => {
    fetchProductData();
  },[])

  return (
    <div>
      {/* section 1 */}
      <div className="flex gap-6">
        
        {/* <div>
        {
          loading ? <Spinner />  :
          posts.length > 0 ? 
          (<div className="grid  xs:gridcols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl p-2 mx-auto space-y-10 space-x-5 min-h-[80vh]">
            {
              posts.map( (post) => (
              <Product key = {post.id} post={post}/>
            ) )
            }

          </div>) :
          <div className="flex justify-center items-center">
            <p>No Data Found</p>
          </div> 
        }
        </div> */}


        <div className=""><img src={imageLady} alt="home" width="1235px"/></div>
          <div className="flex flex-col p-20 bg-orange-50 justify-center gap-7">
            <p className="font-extrabold text-4xl leading-snug">Make every morning amazing </p>
            <p className="text-lg  leading-8">One sip of perfectly brewed coffee is all <br></br>it takes.</p>
            <button className="flex font-extrabold bg-slate-900 w-fit p-3 text-white justify-start">Shop Ration Machines</button>
          </div>
      </div>

      {/* section 2 */}
      <div className="flex flex-col items-center mt-28 gap-10 mb-16">
          <div className="flex flex-col gap-8 items-center">
              <p className="text-slate-800 font-extrabold text-3xl">Meet the Ratio line-up. </p>
              <p className="leading-6 text-center">Every Ratio machine is inspired by the beautiful ritual of manual brewing, often called <br />pour over. Many of us love the taste of pour over but not the attention to detail and <br /> precision required for a consistent result. Enter Ratio.</p>
          </div>
          <div className="flex gap-3">
            <Card thumbnail = {grinder1} itemName={"Ration Six"} itemDescription={"SCA AWARD WINNER"} btnText={"Shop Six"}/>
            <Card thumbnail = {grinder2} itemName={"Shop Eight"} itemDescription={"OUR BEST-SELLING ORIGINAL"} btnText={"Shop Eight"}/>
            <Card thumbnail = {grinder3} itemName={"Ratio Eight Thermal Set"} itemDescription={"THE COMPLETE PACKAGE"} btnText={"Shop Thermal Set"}/>
          </div>
      </div>

      {/* section 4 */}
      <div className="flex gap-5 m-16">
          <div className="flex flex-col w-[50%] bg-orange-50 justify-center pl-14 gap-7">
            <p>The right Ratio for you</p>
            <p className="font-extrabold text-4xl leading-snug">Compare Ratio machines.</p>
            <p className="text-md leading-8">Whatever Ratio model you choose is the product of our closest attention to detail and commitment to incredible coffee. We've made it easy for you to compare each model side by side..</p>
            <button className="flex font-extrabold bg-slate-900 w-fit p-3 text-white justify-start">Shop Ration Machines</button>
          </div>
          <div className="w-[50%]"><img src={compare} alt="home"/></div>
      </div>
      
       {/* section 4 */}
      <div className=" mt-28 flex flex-col items-center gap-10">
        <div>
          <p className="text-slate-800 font-extrabold text-3xl">The best part of your day just got better.</p>
        </div>
        <div className="flex gap-3">
            <Card thumbnail = {routine} itemName={"Ration Six"} itemDescription={"SCA AWARD WINNER"} btnText={"Shop Six"}/>
            <Card thumbnail = {taste} itemName={"Shop Eight"} itemDescription={"OUR BEST-SELLING ORIGINAL"} btnText={"Shop Eight"}/>
            <Card thumbnail = {EnjoyLife} itemName={"Ratio Eight Thermal Set"} itemDescription={"THE COMPLETE PACKAGE"} btnText={"Shop Thermal Set"}/>
          </div>
      </div>
    </div>
  );
};

export default Home;
