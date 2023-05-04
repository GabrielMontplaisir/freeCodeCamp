// Imports
import { useState, useEffect } from "react";
import Quote from "./components/Quote";
import Twitter from "./components/Twitter";
// import "animate.css";

export default function App() {
  // useState for the data fetched from the Quotable API.
  // setQuote is the function which will save the data to quote.
  // content: "" and author: "" are empty strings and default values.
  const [quote, setQuote] = useState({ content: "", author: "" });

  // Function to animate an element and remove it for cleanup once it's complete.
  const animateCSS = (
    element: string,
    animation: string
    // prefix = "animate__"
  ) =>
    // We create a Promise and return it
    new Promise((resolve) => {
      // const animationName = `${prefix}${animation}`;
      const animationName = `${animation}`;
      const node = document.querySelector(element);

      // node?.classList.add(`${prefix}animated`, animationName);
      node?.classList.add(animationName);

      // When the animation ends, we clean the classes and resolve the Promise
      function handleAnimationEnd(event: any) {
        event.stopPropagation();
        // node?.classList.remove(`${prefix}animated`, animationName);
        node?.classList.remove(animationName);
        resolve("Animation ended");
      }

      node?.addEventListener("animationend", handleAnimationEnd, {
        once: true,
      });
    });

  // Function to set random hsl() values.
  const setColor = () => {
    const hue = Math.floor(Math.random() * 255);
    const sat = Math.floor(Math.random() * 100);
    const light = Math.floor(Math.random() * 100);
    // If lightness is equal or above to 70%, then adjust the text color to a grey.
    if (light >= 70) {
      document.documentElement.style.setProperty("--clr-text", "hsl(0,0%,35%)");
    } else {
      document.documentElement.style.setProperty(
        "--clr-text",
        "hsl(60, 6%, 94%)"
      );
    }
    // Make background that color.
    return document.documentElement.style.setProperty(
      "--clr-background",
      `hsl(${hue}, ${sat}%, ${light}%)`
    );
  };

  useEffect(() => {
    const quoteBtn = document.getElementById("new-quote");
    // Creating a promise function to fetch the quote from the Quotable API, since we weren't clever enough to find our own quotes.
    async function fetchData() {
      try {
        // Await for the fetch response.
        const response = await fetch("https://api.quotable.io/quotes/random");
        const { statusCode, statusMessage, ...data } = await response.json();
        // If it doesn't return an error, then setQuote (state) to the Data.
        // The Data comes in an array, so grab the first index.
        if (!response.ok) throw new Error(`${statusCode} ${statusMessage}`);
        setQuote(data[0]);
      } catch (e) {
        console.error(e);
        setQuote({ content: "Failed to fetch quotes", author: "" });
      }
    }
    // If we click the 'New Quote' button.
    quoteBtn?.addEventListener("click", (event) => {
      // Prevent any "default" action
      event.stopPropagation();
      // We're going to set a "timeout" and wait for the fade-out animation (1s long)
      setTimeout(() => {
        fetchData(); // Fetch a new quote
        setColor(); // Update the background color.
      }, 1000);

      // Run the Animation. Once the first is complete, clear the time out and run the fade-in.
      animateCSS(".quote-container", "fade-out").then(() => {
        animateCSS(".quote-container", "fade-in");
      });
    });

    // Run these functions once by default on startup so we start with a quote and a random colour.
    setColor();
    fetchData();
  }, []);

  // If there is no quote, return null.
  if (!quote) return null;

  return (
    <main id="quote-box">
      <Quote content={quote.content} author={quote.author} />
      <div className="btn-container">
        <button id="new-quote" type="button">
          New Quote
        </button>
        <Twitter url={quote} />
      </div>
    </main>
  );
}
