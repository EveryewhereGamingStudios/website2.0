import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useFirebase } from "./FirebaseProvider";
import { collection, getDoc, getDocs, doc, addDoc } from "firebase/firestore";
import moment from "moment";
// import blog from "../data/blog.json";

export interface IBlogPost {
  uuid: string;
  createdAt: string;
  title: string;
  timeToRead: string;
  coverImage: string;
  bannerImage: string;
  link: string;
  content: IContentOne[];
}

interface IContentOne {
  uuid: string;
  title: string;
  desctiption: string;
}

interface BlogContextProps {
  articles: IBlogPost[];
  article: IBlogPost | undefined;
  loading: boolean;
  error: string;
  loadingPost: boolean;
  getArticleById: (id: string) => Promise<IBlogPost | undefined>;
  getArticles: () => Promise<IBlogPost[]>;
  postBlog: (data: IBlogPost) => Promise<void>;
}

interface Props {
  children: JSX.Element;
}

export const BlogContext = createContext<BlogContextProps | undefined>(
  undefined
);

const BlogProvider: React.FC<Props> = ({ children, ...rest }) => {
  const [articles, setArticles] = useState<IBlogPost[]>([]);
  const [article, setArticle] = useState<IBlogPost | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [loadingPost, setLoadingPost] = useState(false);
  const { db } = useFirebase();
  const blogRef = collection(db, "blog");

  const getArticleById = useCallback(
    async (id: string) => {
      setLoading(true);

      try {
        const docRef = doc(db, "blog", id);
        const docSnap = await getDoc(docRef);

        setArticle({
          ...(docSnap.data() as IBlogPost),
          uuid: docSnap.id as string,
        });
      } finally {
        setLoading(false);
      }

      return undefined;
    },
    [db]
  );

  const postBlog = useCallback(
    async (data: IBlogPost) => {
      try {
        setLoadingPost(true);
        addDoc(collection(db, "blog"), data);
      } catch (e) {
        console.log(e, "Error in blog post!");
      } finally {
        setLoadingPost(false);
      }
    },
    [db]
  );

  // useEffect(() => {
  //   postBlog(anotherBlogPost);
  // }, []);

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
      postBlog,
    };
  }, [
    articles,
    article,
    loading,
    error,
    loadingPost,
    getArticleById,
    getArticles,
    postBlog,
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

// const blogPost = {
//   uuid: "fbd48d63-5a71-4d21-b050-10cec38304f1 ",
//   createdAt: moment().format("LL"),
//   title: "Cosmic Exodus is back",
//   timeToRead: "3 minutes",
//   coverImage:
//     "https://firebasestorage.googleapis.com/v0/b/cosmic-exodus.appspot.com/o/space.png?alt=media&token=eb368ad7-1c82-428a-ad5d-64de50f79ba0",
//   bannerImage:
//     "https://firebasestorage.googleapis.com/v0/b/cosmic-exodus.appspot.com/o/spaceportal.png?alt=media&token=f571003e-6da2-48e8-840f-224118ad7fca",
//   link: "https://discord.gg/36AdSFvSX5",
//   content: [
//     {
//       uuid: "05738efc-0e4d-4a0a-bb11-885b3a99c4bc",
//       title: "Enter the metaverse of web3 gaming",
//       desctiption:
//         "Hello and Welcome, Cosmic People 👋 We are so excited to tell you all the news! 😀 You may wonder, but Tom, why are you so happy? 🤔 Now it is finally happening. Now is the moment. The fun is about to begin. Cosmic Exodus is back! Review what is in the past and what to expect to see from us this year. Dive in and feel the Cosmic energy.",
//     },
//     {
//       uuid: "f0196e46-1b50-47a2-a100-3c0bb982e01e",
//       title: "In the Past, the Lessons.",
//       desctiption:
//         "What did we learn from 18 months of setbacks, obstacles, and bottlenecks to solve? We learned to adapt, execute, and listen to feedback. About the continuous journey of finding all the answers we are looking for, the right people to build a team. We may not be the most experienced in the market, but we are aware of the challenges. We went back to stealth mode, and in the last quarter of 2022, we decided to pivot the project scope to reduce the time to market. The passion for the dream must be more significant than the problems. We are not afraid of change. We embrace innovation!",
//     },
//     {
//       uuid: "ee05ff56-11a4-4008-804a-dac6e4551442",
//       title: "Now is the Moment",
//       desctiption:
//         "Building momentum and execution as the key to unlocked potential. Excitement and passion bring an awesome aura anywhere, right? We refreshed our logo, got the blog online, and deployed our new website. We keep building, fixing, and polishing to provide you with the best experience possible. If you want to become a Cosmic Pioneer and have exclusive access to the alpha game test run, youneed to sign up.🚀 What are you waiting for? There will be prizes! Our waitlist is ready to receive applications. Look on our website to find out more.",
//     },

//     {
//       uuid: "4345a3e3-75ce-4bb9-ab9f-9d51f1eada64",
//       title: "The Future",
//       desctiption:
//         "Our focus is on improving user experience to a seamless, immersive one. We aim to introduce a lot of new additions in 2023, not only on the technology side but also with our community and partners. Expect a continuous flow of innovation, testing, and iterations. We learn and increase our capabilities, but we do it better and faster if we get valuable feedback along our journey. Let's contribute together to web3 gaming adoption. Feel free to share your insights with us. 🙏 We are listening!",
//     },
//     {
//       uuid: "38bf806b-09b4-49e9-9e60-5115c4047b0d",
//       title: "Conclusion",
//       desctiption:
//         "Cosmic Exodus is an immersive strategy GameFi experience. Enter the metaverse of web3 gaming, where your sole focus is on having fun. Our free-to-play, non-pay-to-win games offer endless entertainment and the opportunity to earn digital assets or digital goods. The road to building an interoperable ecosystem. With a low barrier of entry for new users. A metaverse where users can become creators, and much more. It’s an ecosystem designed to provide all needs in one place!",
//     },
//     {
//       uuid: "a3074065-3cba-4982-b62e-375e9a549a85",
//       title: "Keypoints takeaway:",
//       desctiption:
//         "Great things take time to build. It is an ever-evolving experience to achieve a fun moment that people can't forget. Cosmic Exodus is making it easier for players to enjoy a great game. To reach the vision and maintain the values our team aims for, we need your help. Stay tuned for what is coming! Visit our website at cosmicexodus.xyz and subscribe to our waitlist! Join our Discord, and be part of a vibrant community. Connect with others, share ideas, and get the latest updates on all things related to our ecosystem. We look forward to seeing you there!",
//     },
//   ],
// };

// const anotherBlogPost = {
//   uuid: "b865dbac-8394-43d6-8c0b-1c82f4f10e11",
//   createdAt: moment().format("LL"),
//   title: "Discovering the Galactic Wonders",
//   timeToRead: "5 minutes",
//   coverImage: "https://picsum.photos/seed/space/500/500",
//   bannerImage: "https://picsum.photos/seed/space/500/500",
//   link: "https://galacticwonders.com",
//   content: [
//     {
//       uuid: "deade04b-5632-4bf3-9a37-26c489652da1",
//       title: "Embarking on a Celestial Expedition",
//       desctiption:
//         "Welcome, fellow stargazers! ✨ Join us on a cosmic journey beyond the horizons of our planet. The Galactic Wonders is your gateway to the awe-inspiring universe. Let's explore the mysteries of distant galaxies, cosmic phenomena, and the enigmatic beauty of the cosmos.",
//     },
//     {
//       uuid: "3c62a5f5-ef61-4e6c-ae9b-821387c79e6d",
//       title: "Unveiling the Celestial Tapestry",
//       desctiption:
//         "Amidst the tapestry of stars, we decipher the secrets of celestial bodies. Delve into the realms of astronomy and astrophysics as we uncover the origins of galaxies, the birth of stars, and the captivating dance of planets. Prepare to be enchanted by the grandeur of the universe.",
//     },
//     {
//       uuid: "be0d97e4-132e-4e7e-b5e5-9323ea87cfad",
//       title: "Sailing the Cosmic Seas",
//       desctiption:
//         "Navigate the cosmic seas as we set sail through the Milky Way and beyond. From black holes to pulsars, we traverse the cosmic terrain that captivates astronomers and space enthusiasts alike. Join us in this celestial voyage and witness the wonders of deep space.",
//     },
//     {
//       uuid: "d37fba7c-cb81-4c76-b229-b08e82c841c1",
//       title: "Embrace the Starlit Nights",
//       desctiption:
//         "Embrace the starlit nights and the serenity they bring. The Galactic Wonders invites you to step out and gaze upon the night sky. Learn about celestial events, meteor showers, and the constellations that have guided humanity for millennia. Rediscover the magic of stargazing.",
//     },
//     {
//       uuid: "ae74a95d-35a3-4d8c-bd5d-d2f11eb9a3c7",
//       title: "Join the Cosmic Community",
//       desctiption:
//         "As we journey through the cosmos, we invite you to join our cosmic community. Visit our website at galacticwonders.com and connect with fellow space enthusiasts. Engage in discussions, share your own observations, and stay updated on celestial events. Together, let's celebrate the wonders of the universe.",
//     },
//   ],
// };
