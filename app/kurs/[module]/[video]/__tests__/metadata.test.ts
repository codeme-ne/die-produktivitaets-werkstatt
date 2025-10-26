import { generateMetadata } from "../page";

void (async () => {
  const metadata = await generateMetadata({
    params: Promise.resolve({
      module: "modul-07",
      video: "haupt-neben-missionen",
    }),
  });

  const expectedTitle =
    "🗺️ Haupt- & Neben-Missionen | Produktivitäts-Werkstatt";

  if (metadata.title !== expectedTitle) {
    throw new Error(
      "generateMetadata should retain ampersands in lesson titles",
    );
  }
})();
