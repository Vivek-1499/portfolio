import { atom, useAtom } from "jotai";

const pictures = [
  "image1",
  "image2",
  "image1",
  "image2",
  "image1",
  "image2",
  "image1",
  "image2",
  "image1",
  "image2",
  "image1",
  "image2",
  "image1",
  "image2",
  "image1",
  "image2",
];

export const pageAtom = atom(0);

export const pages = [
  {
    front: "image",
    back: pictures[0],
  },
];

for (let i = 1; i < pictures.length - 1; i += 2) {
  pages.push({
    front: pictures[i % pictures.length],
    back: pictures[(i + 1) % pictures.length],
  });
}

pages.push({
  front: pictures[pictures.length - 1],
  back: "image4",
});

export const UI = () => {
  const [page, setPage] = useAtom(pageAtom);

  return (
    <section className="w-full py-10 px-4 flex flex-col items-center justify-start gap-10">
      {/* Page Selector */}
      <div className="w-full max-w-7xl mx-auto flex justify-center">
        <div className="flex flex-wrap justify-center items-center gap-4">
          {[...pages].map((_, index) => (
            <button
              key={index}
              className={`border-transparent hover:border-white transition-all duration-300 px-4 py-2 rounded-full text-base uppercase shrink-0 border ${
                index === page
                  ? "bg-white/90 text-black"
                  : "bg-black/30 text-white"
              }`}
              onClick={() => setPage(index)}>
              {index === 0 ? "Cover" : `Page ${index}`}
            </button>
          ))}
          <button
            className={`border-transparent hover:border-white transition-all duration-300 px-4 py-2 rounded-full text-base uppercase shrink-0 border ${
              page === pages.length
                ? "bg-white/90 text-black"
                : "bg-black/30 text-white"
            }`}
            onClick={() => setPage(pages.length)}>
            Back Cover
          </button>
        </div>
      </div>
    </section>
  );
};
