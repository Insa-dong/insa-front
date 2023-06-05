import { useState, useEffect } from "react";
import NewsItem from "../items/NewsItem";
import axios from "axios";

const NewsList = ({ category }) => {
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const pageSize = 5; // 카테고리당 불러올 기사 개수
        const url = `https://newsapi.org/v2/top-headlines?country=kr&category=business&pageSize=${pageSize}&apiKey=e869ae6f425e437c95267d17ffe6890c`;
        const response = await axios.get(url);
        setArticles(response.data.articles);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };

    fetchData();
  }, [category]);

  // 대기 중 상태
  if (loading) {
    return <div> 뉴스 로딩 중… </div>;
  }
  // 값이 설정되지 않은 상태
  if (!articles) {
    return null;
  }

  // articles 값이 있다면
  return (
    <div>
      {articles.map((article) => (
        <NewsItem key={article.url} article={article} />
      ))}
    </div>
  );
};

export default NewsList;