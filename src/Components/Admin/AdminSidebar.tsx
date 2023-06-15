import links from "../../data/links.json";
import AdminProfile from "./AdminProfile";

const AdminSidebar = () => {
    return <>
        <div className="top">
            <span className="title">Admin Panel</span>
            {/* <a href={links.withstand_kairos} className="thin">Withstand Kairos <span className="btn-new">New</span></a> */}

            <img src="/assets/images/line.png" alt="Line" className="hr" />

            <a href={links.admin_blog}>Blog</a>
            <a href={links.admin_waitlist}>Waitlist</a>
            <a href={links.admin_accounts}>Accounts</a>

            <img src="/assets/images/line.png" alt="Line" className="hr" />

            <div className="mobile-only">
                <img src="/assets/images/line.png" alt="Line" className="hr" />

                <a href={links.discord}>Join us on Discord <img src="/assets/images/discord.png" alt="Discord Channel icon" /></a>
            </div>

        </div>
        <div className="bottom">
            <AdminProfile />
        </div>
    </>;
};

export default AdminSidebar;