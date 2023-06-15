import { createContext, useContext, useState } from "react";
import { FirebaseContext } from "./FirebaseProvider";
import { collection, getDoc, getDocs, doc } from "firebase/firestore";
// import blog from "../data/blog.json";

interface Article {
    id: string;
    title: string;
    content: string;
    summary: string;
    image: string;
    tags: string[];
    date: {
        seconds: number;
    }
}

interface BlogContextProps {
    articles: Article[];
    article: Article | undefined;
    loading: boolean;
    error: string;
    getArticleById: (id: string) => Promise<Article | undefined>;
    getArticles: () => Promise<Article[]>;
}

export const BlogContext = createContext<BlogContextProps>({} as BlogContextProps);

const BlogProvider = ({children}: any) => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [article, setArticle] = useState<Article | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const {db} = useContext(FirebaseContext);
    const blogRef = collection(db, 'blog');

    const getArticleById = async (id: string) => {
        setLoading(true);

        try {   
            const docRef = await doc(db, "blog", id);
            const docSnap = await getDoc(docRef);

            setArticle({
                ...docSnap.data() as Article,
                id: docSnap.id as string,
            });


        } finally {
            setLoading(false);
        }

        return undefined;
    }

    const getArticles = async () => {
        setLoading(true);

        

        try {
        
            const querySnapshot = await getDocs(blogRef);
            querySnapshot.forEach((doc: any) => {

                setArticles([
                    ...articles,
                    {
                        ...doc.data() as Article,
                        id: doc.id as string,
                    }
                ])
            });
    
        } catch (e:any) {
            setError(e + "");
        }finally {
            setLoading(false);
        } 

        return [];
    }


    return <BlogContext.Provider value={{
        articles,
        article,
        loading,
        error,
        getArticleById,
        getArticles
    }}> {children} </BlogContext.Provider>
}

export default BlogProvider;
        

        