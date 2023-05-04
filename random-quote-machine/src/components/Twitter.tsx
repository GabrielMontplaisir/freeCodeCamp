// Import FontAwesome for the Twitter Logo
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

export default function Twitter({ url }: any) {
  // Function to transform the URL every time we fetch a new quote.
  const setURL = (quote: any) => {
    // Convert spaces to their hex value: %20
    const urlQuote = quote.content.replace(/\s/g, "%20");
    const urlAuthor = quote.author.replace(/\s/g, "%20");
    // This updates the URL with the quote content and author so the tweet automatically pre-generates the quote.
    return `https://twitter.com/intent/tweet?text="${urlQuote}"%20--${urlAuthor}`;
  };

  // Typically a hyperlink opens a new tab, or replaces the current tab entirely. This function alternatively opens a smaller popup for the tweet.
  const openPopup = (url: any, width: number, height: number) => {
    // Determine dimensions of popup.
    const left = screen.width / 2 - width / 2;
    const top = screen.height / 2 - height / 2;
    // Grab the URL from the setQuote() function.
    return window.open(
      url,
      "Tweet Quote",
      "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=" +
        width +
        ",height=" +
        height +
        ",top=" +
        top +
        ",left=" +
        left
    );
  };

  // Event Listener when we click on the Tweet button.
  document.getElementById("tweet-quote")?.addEventListener("click", (event) => {
    event.preventDefault();
    openPopup(setURL(url), 600, 300);
  });
  // Generate the DOM for the button. Generate the url via the function above.
  return (
    <a id="tweet-quote" href={setURL(url)} target="_blank" title="Tweet quote">
      <FontAwesomeIcon icon={icon({ name: "twitter", style: "brands" })} />
    </a>
  );
}
