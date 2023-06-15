import * as functions from "firebase-functions";
import * as express from "express";
import * as cors from "cors";
import { v4 as uuid} from "uuid";
import {  db, auth } from "./firebase";


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true }));

const v1 = express.Router();


v1.post("/signWaitlist", (request, response) => {
    db.collection("waitlist").add({
        email: request.body.email,
        timestamp: Date.now()
    }).then(() => {
        response.send("Success");
    }
    ).catch((error: any) => {
        response.send("Database Error: " + error);
    }
    );
});

v1.post("/signup", (request, response) => {
    let user = {
        uid: uuid(),
        displayName: request.body.name || "",
        email: request.body.email || "",
        password: request.body.password,
    }
    
    const authUser = auth.createUser(user)
    .then((userRecord: any) => {
        return userRecord;
    })
    .catch((error: any) => {
        response.status(500).send("Auth Error: " + error);
    });

    if(!authUser){
        response.status(500).send("Error creating user");
    }

    response.send("success");
});

v1.get("/blog", async (request, response) => {
    const q = {
        start: parseInt(request.query.start?.toString() || "0"),
        end: parseInt(request.query.end?.toString() || "10"),
        limit: parseInt(request.query.limit?.toString() || "10"),
        tags: request.query.tags?.toString().split(",") || [],
        search: request.query.search?.toString() || "",
        sort: request.query.sort?.toString() || "date",
        query: request.query.order?.toString() || "desc",
    }

    let query = db.collection("blog");

    if(q.sort === "date" || q.sort === "title"){
        if(["asc", "desc"].indexOf(q.query) === -1 || q.query === ""){
            q.query = "desc";
        }
        query = query.orderBy(q.sort, q.query);
    }

    if(q.tags.length > 0){
        query = query.where("tags", "array-contains-any", q.tags);
    }

    // if(q.search.length > 0){
    //     query = query.where("title", ">=", q.search).where("title", "<=", q.search + "\uf8ff");
    //     query = query.where("content", ">=", q.search).where("content", "<=", q.search + "\uf8ff");
    // }

    if(q.limit > 100) {
        q.limit = 100;
    }

    // query = query.startAt(q.start).endAt(q.end).limit(q.limit);

    const articles = await query.get().then((snapshot: any) => {
        let articles: any[] = [];
        snapshot.forEach((doc: any) => {
            const data = doc.data();
            articles.push({
                id: doc.id,
                title: data.title,
                date: data.date,
                summary: data.summary,
            });
        });

        return articles;
    }).catch((error: any) => {
        response.status(500).send("Database Error: " + error);
    });

    response.send(articles);

});

v1.get("/blog/:id",  async (request, response) => {
    const id = request.params.id?.toString() || "";

    const article = await db.collection("blog").doc(id).get().then((doc: any) => {
        if(doc.exists){
            return doc.data();
        } else {
            response.status(404).send("Article not found");
        }
    }).catch((error: any) => {
        response.status(500).send("Database Error: " + error);
    });

    response.send(article);
});

app.use("/v1", v1);

app.use((request, response) => {
    response.status(404).send("404 - Not Found");
});


export const api = functions.https.onRequest(app);