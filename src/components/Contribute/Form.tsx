// Utils
import { useTheme } from "../../utils/Theme";
// Icons
import arrow from "/assets/icons/arrow-right.svg";
import mail from "/assets/icons/mail.svg";
import user from "/assets/icons/user.svg";

export default function Form() {
  const { theme, themeClasses } = useTheme();
  const style = themeClasses(theme);

  const accessKey = import.meta.env.VITE_ACCESS_KEY;

  return (
    <div
      className={`max-w-screen-md mx-auto mt-16 mb-40 sm:p-12 p-8 ${style.background} rounded-xl`}
    >
      <form method="POST" action="https://api.web3forms.com/submit">
        <input type="hidden" name="access_key" value={accessKey} />
        <input type="hidden" name="redirect" value=""></input>
        <input type="hidden" name="from_name" value="IT Croatia"></input>
        <input type="hidden" name="subject" value="New Contribution"></input>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mt-4 group">
            <label
              htmlFor="name"
              className={`block mb-2 ${style.text} text-md`}
            >
              Name / Alias
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 border border-r-0 border-[#999] rounded-l-md">
                <img src={user} className="w-5 h-5" alt="User icon" />
              </span>
              <input
                className={`rounded-none rounded-r-lg ${style.background} border border-[#999] ${style.text} focus:ring-[#6875F5] focus:ring-1 focus:border-[#6875F5] block flex-1 min-w-0 w-full text-sm p-3`}
                type="text"
                name="name"
                id="name"
                maxLength={30}
                autoComplete="off"
                placeholder="John Doe"
              />
            </div>
            <p className="mt-2 text-sm text-[#999]">
              Optional - if you want a mention in contributions.
            </p>
          </div>
          <div className="relative z-0 w-full mt-4 group">
            <label
              htmlFor="name"
              className={`block mb-2 ${style.text} text-md`}
            >
              Email
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 border border-r-0 border-[#999] rounded-l-md">
                <img src={mail} className="w-5 h-5" alt="Mail icon" />
              </span>
              <input
                className={`rounded-none rounded-r-lg ${style.background} border border-[#999] ${style.text} focus:ring-[#6875F5] focus:ring-1 focus:border-[#6875F5] block flex-1 min-w-0 w-full text-sm p-3`}
                type="email"
                name="email"
                id="email"
                maxLength={50}
                autoComplete="off"
                placeholder="john.doe@gmail.com"
              />
            </div>
            <p className="mt-2 text-sm text-[#999]">
              Optional - if you want a receive a reply.
            </p>
          </div>
        </div>
        <label
          htmlFor="message"
          className={`block mt-4 mb-2 font-medium ${style.text} text-md`}
        >
          Your contribution
        </label>
        <textarea
          className={`block p-2.5 w-full text-sm ${style.text} ${style.background} rounded-lg border border-[#999] focus:ring-[#6875F5] focus:border-[#6875F5]`}
          name="message"
          id="message"
          rows={5}
          maxLength={500}
          autoComplete="off"
          placeholder="Hi, I would like to submit a company 'Google' to be added."
          required
        ></textarea>
        <button
          type="submit"
          className="inline-flex px-5 py-3 mx-auto mt-8 font-normal text-center text-white bg-indigo-500 rounded-lg text-md hover:bg-indigo-500 focus:ring-1 focus:outline-none focus:ring-indigo-300"
        >
          Submit contribution
          <img src={arrow} className="w-6 h-6 ms-2" alt="Arrow icon" />
        </button>
      </form>
    </div>
  );
}
