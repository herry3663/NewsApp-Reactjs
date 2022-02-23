import React, { useEffect,useState } from "react";
import NewsItem from "./NewsItem";
// import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News =(props)=> {

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  
  // static PropTypes={
  //     country:PropTypes.string,
  //     pageSize:PropTypes.number,
  //     category:PropTypes.string,

  // }

  
    
  
  const updateNews=async()=> {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=00a915af844a4cafb818fe09b95324ed&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(50);
    console.log(parsedData);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    props.setProgress(100);
  }
  useEffect(() => {
    document.title = `${props.category}-NewsMonkey-Get daily news for free`;
    updateNews();
  
  }, []);
  
 
//   handlePrevClick = async () => {
//     this.setState({ page: this.state.page - 1 });
//     this.updateNews();
//   };
//   handleNextClick = async () => {
//     this.setState({ page: this.state.page + 1 });
//     this.updateNews();
//   };
  const fetchMoreData = async() => {
      
    
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=00a915af844a4cafb818fe09b95324ed&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1);
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
    
 };

  
    return (
      <div className="container my-3">
        <h1 className="text-center"style={{marginTop:'90px'}}>NewsMonkey-Top Headlines</h1>
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !==totalResults}
          loader={<h4 className="text-center">Loading...</h4>}
        >
            <div className="container">
                <div className="row ">
                    {articles.map((element) => {
                    return (
                        <div className="col-md-4 " key={element.url}>
                        <NewsItem
                            title={element.title ? element.title.slice(0, 45) : ""}
                            description={
                            element.description
                                ? element.description.slice(0, 88)
                                : ""
                            }
                            imageUrl={element.urlToImage}
                            newsUrl={element.url}
                            author={element.author}
                            date={element.publishedAt}
                        />
                        </div>
                    );
                    })}
                </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-danger"
            onClick={this.handlePrevClick}
          >
            &larr;Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / props.pageSize)
            }
            type="button"
            className="btn btn-danger"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div> */}
      </div>
    );
  
}
 News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};

export default News;
