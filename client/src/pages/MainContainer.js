import React from "react";
import Nav from "../components/Nav";
import CategorySearch from "../components/CategorySearch";
import NewsAPI from "../components/NewsAPI";
import ResultCard from "../components/ResultCard";
import FootprintCard from "../components/FootprintCard";
import FooterBar from "../components/FooterBar"

function MainContainer() {
  return (
      <div>
        <Nav />
        {/* <div className="container"> */}
          <CategorySearch /> 
          <ResultCard />
          <NewsAPI />
          <FootprintCard />
        {/* </div> */}
        <FooterBar />
      </div>
  );
}

export default MainContainer;