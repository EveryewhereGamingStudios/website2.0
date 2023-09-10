import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useFirebase } from "./FirebaseProvider";
import { collection, getDoc, getDocs, doc, addDoc } from "firebase/firestore";

interface ContentItem {
  title: string;
  description: string;
}

export interface ArticleData {
  uuid: string;
  articleTitle: string;
  bannerImage: string;
  coverImage: string;
  link: string;
  date: string;
  timeToRead: string;
  content: ContentItem[];
}

interface BlogContextProps {
  articles: ArticleData[];
  article: ArticleData | undefined;
  loading: boolean;
  error: string;
  loadingPost: boolean;
  getArticleById: (id: string) => Promise<ArticleData | undefined>;
  getArticles: () => Promise<ArticleData[]>;
  postArticle: (data: ArticleData) => Promise<void>;
}

interface Props {
  children: JSX.Element;
}

export const BlogContext = createContext<BlogContextProps | undefined>(
  undefined
);

const BlogProvider: React.FC<Props> = ({ children, ...rest }) => {
  const [articles, setArticles] = useState<ArticleData[]>([]);
  const [article, setArticle] = useState<ArticleData | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [loadingPost, setLoadingPost] = useState(false);
  const { db } = useFirebase();
  const blogRef = collection(db, "articles");

  const getArticleById = useCallback(
    async (id: string) => {
      setLoading(true);

      try {
        const docRef = doc(db, "articles", id);
        const docSnap = await getDoc(docRef);

        setArticle({
          ...(docSnap.data() as ArticleData),
          uuid: docSnap.id as string,
        });
      } finally {
        setLoading(false);
      }

      return undefined;
    },
    [db]
  );

  const postArticle = useCallback(
    async (data: ArticleData) => {
      try {
        setLoadingPost(true);
        addDoc(collection(db, "articles"), data);
      } catch (e) {
        console.log(e, "Error in blog post!");
      } finally {
        setLoadingPost(false);
      }
    },
    [db]
  );

  const getArticles = useCallback(async () => {
    setLoading(true);

    try {
      const querySnapshot = await getDocs(blogRef);
      const updatedArticles = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
      setArticles(updatedArticles as any);
    } catch (e) {
      setError(`${e}`);
    } finally {
      setLoading(false);
    }

    return [];
  }, [blogRef]);

  const value = useMemo(() => {
    return {
      articles,
      article,
      loading,
      error,
      loadingPost,
      getArticleById,
      getArticles,
      postArticle,
    };
  }, [
    articles,
    article,
    loading,
    error,
    loadingPost,
    getArticleById,
    getArticles,
    postArticle,
  ]);
  return (
    <BlogContext.Provider value={value} {...rest}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = (): BlogContextProps => {
  const context = useContext(BlogContext);

  if (context === undefined) {
    throw new Error("useBlog must be used within an BlogProvider");
  }

  return context;
};

export default BlogProvider;
