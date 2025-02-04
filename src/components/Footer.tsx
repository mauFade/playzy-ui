import { FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-zinc-900 text-white py-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        <div className="flex space-x-6 items-center">
          <a
            href="https://linkedin.com/in/maucardooso"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition-colors"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://github.com/mauFade"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-400 transition-colors"
          >
            <FaGithub size={24} />
          </a>
        </div>

        <div className="text-sm text-zinc-400 mt-4 md:mt-0">
          <p>&copy; {new Date().getFullYear()} Maurício Cardoso.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
