import './NewsItem.css'

const NewsItem = ({ article }) => {
    const { title, url} = article;
    
    return (
      
        <div className="contents">
          <p className="content">
            <a href={url} target="_blank" rel="noopener noreferrer">
            📃 {title}
            </a>
          </p>
        </div>
    
    );
  };
  
  export default NewsItem;