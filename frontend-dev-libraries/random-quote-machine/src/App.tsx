import { useState, useEffect } from "react";
import Quote from "./components/Quote";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import "animate.css";

export default function App() {
  const [quote, setQuote] = useState({ content: "", author: "" });

  const animateCSS = (
    element: string,
    animation: string,
    prefix = "animate__"
  ) =>
    // We create a Promise and return it
    new Promise((resolve) => {
      const animationName = `${prefix}${animation}`;
      const node = document.querySelector(element);

      node?.classList.add(`${prefix}animated`, animationName);

      // When the animation ends, we clean the classes and resolve the Promise
      function handleAnimationEnd(event: any) {
        event.stopPropagation();
        node?.classList.remove(`${prefix}animated`, animationName);
        resolve("Animation ended");
      }

      node?.addEventListener("animationend", handleAnimationEnd, {
        once: true,
      });
    });

  const setColor = () => {
    const hue = Math.floor(Math.random() * 255);
    const sat = Math.floor(Math.random() * 100);
    const light = Math.floor(Math.random() * 60);

    return document.documentElement.style.setProperty(
      "--clr-background",
      `hsl(${hue}, ${sat}%, ${light}%)`
    );
  };

  useEffect(() => {
    const quoteBtn = document.getElementById("new-quote");

    async function fetchData() {
      try {
        const response = await fetch("https://api.quotable.io/quotes/random");
        const { statusCode, statusMessage, ...data } = await response.json();
        if (!response.ok) throw new Error(`${statusCode} ${statusMessage}`);
        setQuote(data[0]);
      } catch (e) {
        console.error(e);
        setQuote({ content: "Failed to fetch quotes", author: "" });
      }
    }

    quoteBtn?.addEventListener("click", (event) => {
      event.stopImmediatePropagation();
      setTimeout(() => {
        fetchData();
        setColor();
      }, 1000);
      animateCSS(".quote-container", "fadeOut").then(() => {
        animateCSS(".quote-container", "fadeIn");
      });
    });
    setColor();
    fetchData();
  }, []);

  const setURL = (quote: any) => {
    const urlQuote = quote.content.replace(/\s/g, "%20");
    const urlAuthor = quote.author.replace(/\s/g, "%20");

    return `https://twitter.com/intent/tweet?text="${urlQuote}"%20--${urlAuthor}`;
  };

  const openPopup = (url: any, width: number, height: number) => {
    const left = screen.width / 2 - width / 2;
    const top = screen.height / 2 - height / 2;
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

  document.getElementById("tweet-quote")?.addEventListener("click", (event) => {
    event.preventDefault();
    openPopup(setURL(quote), 600, 300);
  });

  if (!quote) return null;
  return (
    <main id="quote-box">
      <Quote content={quote.content} author={quote.author} />
      <div className="btn-container">
        <button id="new-quote">New Quote</button>
        <a
          id="tweet-quote"
          href={setURL(quote)}
          target="_blank"
          title="Tweet quote"
        >
          <FontAwesomeIcon icon={icon({ name: "twitter", style: "brands" })} />
        </a>
      </div>
    </main>
  );
}
