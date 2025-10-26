import { renderToString } from "react-dom/server";
import { VideoHero } from "../VideoHero";

(() => {
  const title = "Reflexion – Woche 1 & 2";
  const html = renderToString(<VideoHero title={title} />);

  if (!html.includes(title)) {
    throw new Error(
      "VideoHero should render the full title including ampersands",
    );
  }
})();
