import GithubIcon from "../assets/github-icon.svg"

const Footer = () => {
    return (
        <footer className="flex items-center justify-between px-4 py-6 text-white">
            <div>
                <a href="https://github.com/praaatik" target="_blank" rel="noopener noreferrer">
                    <img src={GithubIcon} alt="Github link for the project" className="h-6 w-6 inline-block" />
                </a>
            </div>
        </footer>
    );
};

export default Footer;
