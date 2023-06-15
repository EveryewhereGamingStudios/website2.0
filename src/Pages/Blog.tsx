import { useContext, useEffect } from 'react';
import { BlogContext } from '../Context/BlogProvider';

const Blog = () => {
    const { articles, loading, error, getArticles } = useContext(BlogContext);

    useEffect(() => {
        
        // console.log(">>>>>")
        getArticles();

        // console.log({
        //     articles,
        //     loading,
        //     error,
        //     getArticles
        // })

    },[]);

    return <>
        <div className="blog">
            {loading && <p className="loading">Loading...</p>}
            {error && <p className="error">{error}</p>}
            {articles.map(article => {
                const date = article.date ? new Date(article.date.seconds * 1000) : new Date();
                return <div className="article" key={article.id}>
                    <img src={article.image} alt={article.title} className='' />
                    <h2 className="title">
                        <a href={`/blog/${article.id}`}>
                            {article.title}
                        </a>
                    </h2>
                    <p className="summary">{article.summary} ...</p>
                    <p className="date">{date.toDateString()}</p>
                </div>
            })}
        </div>
    </>
}

export default Blog;