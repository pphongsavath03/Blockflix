// import React from "react";
// import ProductList from "../components/ProductList";
// // import CategoryMenu from "../components/CategoryMenu";
// import Cart from '../components/Cart';


// const Home = () => {
//   return (
//     <div className="container">
//       {/* <CategoryMenu /> */}
//       <ProductList />
//       <Cart />
//     </div>
//   );
// };

// export default Home;

import React from "react";
import SearchMovies from "../components/Searchbar";
import Cart from '../components/Cart';


// import CategoryMenu from "../components/CategoryMenu";
// import Cart from '../components/Cart';


const Home = () => {
  return (
    <div className="container">
      <SearchMovies />
      <Cart/>
    </div>
  );
};

export default Home;