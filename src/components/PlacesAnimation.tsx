import { MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import type { Place } from "../services/api/places/places.types";
import css from "../styles/PlacesAnimation.module.css"

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
    <div className={css.places_container}>
      {places.map((p, index) => {
        const visited = index < visitedCount ? css.visited : css.not_visited;

        return (
          <div className={`${css.anim_item} ${visited}`} key={p.id}>
            <div className={`${css.icon} ${visited}`}>
              <MapPin />
            </div>

            <span className={`${css.location_name} ${visited}`}>
              {p.locationName}
            </span>
          </div>
        );
      })}

      <div
        className={css.anim_bg}
        style={{ animationDuration: `${ANIMATION_DURATION}ms` }}
      />
    </div>
  );
}