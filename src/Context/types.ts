import { Analytics } from "firebase/analytics";
import { FirebaseApp } from "firebase/app";
import { Firestore } from "firebase/firestore";

export interface FirebaseContextProps {
    app: FirebaseApp;
    db: Firestore;
    analytics: Analytics;
    user: IUser | undefined;
    users: IUser[];
    referrals:
      | {
          refs: [
            {
              time: number;
              address: string;
            }
          ];
        }
      | undefined;
    signWaitlist: (email: string) => Promise<boolean>;
    signToOpenDeck: (email: string) => Promise<boolean>;
    updateUser: (editedUser: IUser) => Promise<void>;
    setReferralCode: React.Dispatch<React.SetStateAction<string | undefined>>;
  }
  
  export interface Props {
    children: JSX.Element;
  }
  
  export interface ISocialItems {
    title: string;
    link: string;
  }
  
  export interface IUser {
    email: string;
    name: string;
    publicAddress?: string;
    uid: string;
    photo: string | undefined;
    socialNetworks: ISocialItems[];
    gdpr: boolean;
  }

  export interface ContentItem {
    title: string;
    subTitle?: string;
    description: string;
  }
  
  export interface ArticleData {
    uuid: string;
    articleTitle: string;
    articleDescription?: string;
    bannerImage: string;
    coverImage: string;
    link: string;
    date: string;
    timeToRead: string;
    content: ContentItem[];
  }
  
  export interface BlogContextProps {
    articles: ArticleData[];
    article: ArticleData | undefined;
    loading: boolean;
    error: string;
    loadingPost: boolean;
    getArticleById: (id: string) => Promise<ArticleData | undefined>;
    getArticles: () => Promise<ArticleData[]>;
    postArticle: (data: ArticleData) => Promise<void>;
  }