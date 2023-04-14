$(document).ready(() => {
  $("#theme-btn").change((e) => {
    if ($(e.target).prop("checked")) {
      $(":root").attr("dark", "");
    } else {
      $(":root").removeAttr("dark");
    }
  });

  $("#collapse-btn").change(() => {
    if ($("#navbar").attr("aria-expanded") === "true") {
      $("#navbar").attr("aria-expanded", false);
      $("#main-doc").css("margin-inline", "5rem");
    } else {
      $("#navbar").attr("aria-expanded", true);
      $("#main-doc").css("margin-inline", "");
    }
  });

  $(window).resize(() => {
    let wi = $(window).width();

    if (wi <= 800) {
      $("#navbar").attr("aria-expanded", true);
      $("#main-doc").css("margin-inline", "");
    }
  });
});

// colorThemeCheckbox.addEventListener("change", (e) => {
//   if (e.target.checked) {
//     document.body.setAttribute("data-theme", "dark");
//   } else {
//     document.body.removeAttribute("data-theme");
//   }
// });

var clipboard = new ClipboardJS(".anchor");

// clipboard.on("success", (e) => {
//   console.info("Action:", e.action);
//   console.info("Text:", e.text);
//   console.info("Trigger:", e.trigger);

//   e.clearSelection();
// });

// clipboard.on("error", (e) => {
//   console.error("Action:", e.action);
//   console.error("Trigger:", e.trigger);
// });
