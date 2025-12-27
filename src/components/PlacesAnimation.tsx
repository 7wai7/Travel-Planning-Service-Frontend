import { MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import type { Place } from "../services/api/places/places.types";
import clsx from "clsx";

const ANIMATION_DURATION = 3000; // ms

export function PlacesAnimation({ places }: { places: Place[] }) {
  const [visitedCount, setVisitedCount] = useState(0);

  useEffect(() => {
    if (places.length <= 1) return;

    const step = ANIMATION_DURATION / (places.length - 1);

    places.forEach((_, index) => {
      setTimeout(() => {
        setVisitedCount((prev) => Math.max(prev, index + 1));
      }, step * index);
    });
  }, [places]);

  if (places.length <= 1) return;

  return (
    <div className="relative w-[90%] flex flex-row items-center justify-between mt-20 mb-12 mx-auto">
      {places.map((p, index) => {
        const visited = index < visitedCount;

        return (
          <div className={clsx("relative", visited && "animate-visited-anim")} key={p.id}>
            <div className={clsx("absolute left-[50%] -translate-x-1/2 -translate-y-full transition-[color,stroke,transform] duration-400 ease-in-out")}>
              <MapPin className={clsx("transition-[stroke] duration-200 ease-in stroke-gray-400", visited && "stroke-green-400")}/>
            </div>

            <span className={clsx("absolute -translate-x-1/2 -translate-y-[250%] text-sm text-black whitespace-normal transition-[color] duration-200 ease-in", !visited && "text-gray-400")}>
              {p.locationName}
            </span>
          </div>
        );
      })}

      <div
        className="absolute left-0, top-1/2 h-0.75 w-0 bg-(--blue) rounded-4xl animate-trip-anim fill-mode-forwards"
        style={{ animationDuration: `${ANIMATION_DURATION}ms`, animationFillMode: "forwards" }}
      />
    </div>
  );
}