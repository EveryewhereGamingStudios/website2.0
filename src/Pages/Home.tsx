import links from "../data/links.json";

const Home = () => {
    return <>
        <div className="hero">
            <div className="video">
                <iframe id="ytplayer" width="720" height="405"
                    src="https://www.youtube.com/embed/nMJ-gF2uW4E/?&autoplay=1&t=2"
                /> 
            </div>
            <div className="caption">
                <h1>An immersive strategy <span className="highlight">gamefi</span> experience</h1>

                <div className="cta">
                    <a href="/signup" className="btn btn-primary">Create an account</a>
                    <a href="/waitlist" className="btn btn-secondary">Subscribe to our waitlist</a>
                </div>
                <div className="bottom">
                    <a href={links.saga}><img src="/assets/images/saga.png" alt="Saga logo" /></a>
                    <a href={links.youtube}><img src="/assets/images/yaygames.png" alt="YAY Games logo" /></a>
                </div>
            </div>
        </div>
    </>;
};

export default Home;