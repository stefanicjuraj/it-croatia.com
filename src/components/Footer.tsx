// Icons
import github from "/assets/icons/github.svg";
import linkedin from "/assets/icons/linkedin-light.svg";

export default function Footer() {
  return (
    <footer className="max-w-screen-xl py-16 mx-auto text-center rounded-lg">
      <hr className="border-[#333] mb-16" />
      <div className="inline-flex">
        <a
          href="https://github.com/stefanicjuraj/it-croatia"
          className="mr-2 py-2 px-2 hover:bg-[#333] bg-[#333] rounded-full"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={github} alt="GitHub icon" className="w-5 h-5" />
        </a>
        <a
          href="https://www.linkedin.com/posts/jurajstefanic_from-the-croit-community-on-reddit-activity-7174729313961795584-hFgt?utm_source=share&utm_medium=member_desktop"
          className="ml-2 py-2 px-2 hover:bg-[#333] bg-[#333] rounded-full"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={linkedin} alt="LinkedIn icon" className="w-5 h-5" />
        </a>
      </div>
    </footer>
  );
}
