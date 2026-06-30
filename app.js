const URL =
  "https://raw.githubusercontent.com/YOUR_USER/YOUR_REPO/main/signals.json";

async function loadSignals() {
  try {
    const res = await fetch(URL + "?t=" + Date.now());
    const data = await res.json();

    const feed = document.getElementById("feed");
    feed.innerHTML = "";

    data.reverse().forEach(sig => {
      const div = document.createElement("div");
      div.className = "line " + (sig.side === "LONG" ? "long" : "short");

      div.innerHTML = `
        [${sig.time}] ${sig.side} → ${sig.symbol} | MACD: ${sig.value}
      `;

      feed.appendChild(div);
    });

  } catch (e) {
    console.log("error loading signals", e);
  }
}

loadSignals();
setInterval(loadSignals, 10000);
