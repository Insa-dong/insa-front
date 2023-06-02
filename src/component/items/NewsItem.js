const NewsItem = ({ article }) => {
    const { title, url} = article;
    
    return (
      <div>
        <div className="contents">
          <h2>
            <a href={url} target="_blank" rel="noopener noreferrer">
              {title}
            </a>
          </h2>
        </div>
      </div>
    );
  };
  
  export default NewsItem;