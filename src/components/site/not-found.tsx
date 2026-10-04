"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf, faArrowRight, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "@/components/providers";

export function NotFoundPage() {
  const { navigate } = useRouter();
  return (
    <div className="page-dense pt-28 md:pt-36 pb-16 min-h-[80vh] flex flex-col items-center justify-center text-center">
      <span className="w-20 h-20 rounded-full flex items-center justify-center mb-6" style={{ background: "rgba(31, 61, 43, 0.12)" }} data-animate="scale">
        <FontAwesomeIcon icon={faMagnifyingGlass} className="text-[26px]" style={{ color: "var(--forest)" }} />
      </span>
      <p className="font-display text-7xl md:text-8xl mb-3" style={{ color: "var(--forest-deep)" }} data-animate="rise">
        404
      </p>
      <h1 className="font-display text-2xl md:text-3xl mb-3" style={{ color: "var(--forest-deep)" }} data-animate="rise" data-delay="0.05">
        This path was never sown.
      </h1>
      <p className="max-w-md mb-7" style={{ color: "var(--muted-foreground)" }} data-animate="rise" data-delay="0.1">
        The page you're looking for isn&apos;t here — or it has returned to the meadow. Let&apos;s get you back to the studio.
      </p>
      <div className="flex flex-wrap gap-3 justify-center" data-animate="rise" data-delay="0.15">
        <button onClick={() => navigate("home")} className="btn-straw">
          <FontAwesomeIcon icon={faArrowRight} className="text-[13px] rotate-180" />
          Back home
        </button>
        <button onClick={() => navigate("shop")} className="btn-ghost-glass">
          <FontAwesomeIcon icon={faLeaf} className="text-[13px]" />
          Browse collection
        </button>
      </div>
    </div>
  );
}
