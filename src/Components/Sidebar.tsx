import links from "../data/links.json";

const Sidebar = () => {
    return <>
        <div className="top">
            <span className="title">Games</span>
            <a href={links.withstand_kairos} className="thin">Withstand Kairos <span className="btn-new">New</span></a>

            <img src="/assets/images/line.png" alt="Line" className="hr" />

            <a href={links.blog}>Blog</a>
            <a href={links.whitepaper}>Whitepaper</a>
            <a href={links.deck}>Cosmic Deck</a>
            <span className="disabled">Shop</span>

            <img src="/assets/images/line.png" alt="Line" className="hr" />

            <a href={links.privacy_policy}>Privacy Policy</a>
            <span className="disabled">Terms & Service</span>

            <div className="mobile-only">
                <img src="/assets/images/line.png" alt="Line" className="hr" />

                <a href={links.discord}>Join us on Discord <img src="/assets/images/discord.png" alt="Discord Channel icon" /></a>
            </div>

        </div>
        <div className="bottom">
            <a href="">
                <img src="assets/images/everywhere.png" alt="_Everywhere Logo" />
            </a>

            <span className="copyright">© 2023. Cosmic Exodus, All rights reserved.</span>
        </div>
    </>;
};

export default Sidebar;