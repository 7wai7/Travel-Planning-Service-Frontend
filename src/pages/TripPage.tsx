import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddEditPlaceModal from "../components/AddEditPlaceModal";
import ConfirmDialog from "../components/ConfirmDialog";
import LoadingSpinner from "../components/LoadingSpinner";
import PlaceItem from "../components/PlaceItem";
import { PlacesAnimation } from "../components/PlacesAnimation";
import {
  useCreatePlace,
  useDeletePlace,
  useUpdatePlace,
} from "../hooks/places.hooks";
import { useDeleteTrip, useTrip } from "../hooks/trips.hooks";
import type {
  CreatePlaceInput,
  UpdatePlaceInput,
} from "../services/api/places/places.types";
import useConfirmDialogStore from "../stores/ConfirmDialogStore";
import usePlaceStore from "../stores/PlaceStore";
import css from "../styles/TripPage.module.css";
import { formatDateInput } from "../utils/date";

export default function TripPage() {
  const tripId = Number(useParams().id);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const setPlaceStore = usePlaceStore((s) => s.set);
  const setConfirm = useConfirmDialogStore((s) => s.setConfirm);
  const { data: trip, isLoading, error } = useTrip(tripId);

  const sortedPlaces = useMemo(() => {
    return [...(trip?.places ?? [])].sort(
      (a, b) => Number(a.dayNumber) - Number(b.dayNumber)
    );
  }, [trip?.places]);

  const createPlace = useCreatePlace();
  const updatePlace = useUpdatePlace();
  const deletePlace = useDeletePlace();
  const deleteTrip = useDeleteTrip();

  if (isLoading) return <LoadingSpinner />;
  if (error || !trip)
    return (
      <p className="error_message">
        {error?.message ?? "Oops. Something went wrong."}
      </p>
    );

  const role = trip.tripParticipants?.[0].role ?? "USER";
  const isOwner = role === "OWNER";
  const isCollaborator = role === "COLLABORATOR";
  const canEditPlaces = isOwner || isCollaborator;

  // ----- Handlers -----
  const openAddPlace = () => {
    setPlaceStore({ editingPlace: null, isOpenModal: true });
  };

  const handleCreatePlace = async (
    payload: Omit<CreatePlaceInput, "trip_id">
  ) => {
    await createPlace.mutateAsync(
      { ...payload, trip_id: tripId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["trip-page", tripId] });
          setPlaceStore({ isOpenModal: false });
        },
      }
    );
  };

  const handleUpdatePlace = async (
    payload: Omit<UpdatePlaceInput, "trip_id">
  ) => {
    await updatePlace.mutateAsync(
      { ...payload, trip_id: tripId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["trip-page", tripId] });
          setPlaceStore({ editingPlace: null, isOpenModal: false });
        },
      }
    );
  };

  const handleDeletePlaceConfirm = (placeId: number) => {
    setConfirm({
      isOpen: true,
      title: "Delete place",
      description:
        "Are you sure you want to delete this place? This action cannot be undone.",
      subject: "place",
      payload: placeId,
    });
  };

  const handleDeleteTripConfirm = () => {
    setConfirm({
      isOpen: true,
      title: "Delete trip",
      description:
        "Delete entire trip and all places? This action cannot be undone.",
      subject: "trip",
      payload: tripId,
    });
  };

  const runConfirm = async () => {
    const confirm = useConfirmDialogStore.getState();
    if (!confirm.subject) return;

    if (confirm.subject === "place") {
      const placeId = Number(confirm.payload);
      await deletePlace.mutateAsync(
        {
          id: placeId,
          trip_id: tripId,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["trip-page", tripId] });
            setConfirm({ isOpen: false, subject: null });
          },
        }
      );
    } else if (confirm.subject === "trip") {
      await deleteTrip.mutateAsync(tripId, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["trips-list"] });
          navigate("/trips");
        },
      });
    }
  };

  return (
    <>
      <header className={css.headerRow}>
        <h1 className={css.header}>{trip.title}</h1>
        <div className={css.headerActions}>
          <div className={css.role_badge} data-role={role}>
            {role}
          </div>

          {isOwner && (
            <div className={css.owner_controls}>
              <button
                className={css.edit_trip_btn}
                onClick={() => {
                  /* TODO: open edit trip modal or navigate to edit page */
                  navigate(`/trips/${tripId}/edit`);
                }}
              >
                Edit trip
              </button>

              <button
                className={css.delete_trip_btn}
                onClick={handleDeleteTripConfirm}
              >
                Delete trip
              </button>
            </div>
          )}
        </div>
      </header>

      <PlacesAnimation places={sortedPlaces} />

      <section className={`${css.details} ${css.card}`}>
        <p className={css.description}>
          <strong>Description: </strong>
          {trip.description ? trip.description : "-"}
        </p>

        <p className={css.dates}>
          <strong>Dates: </strong>
          {trip.startDate && trip.endDate ? (
            <>
              {formatDateInput(trip.startDate)} &mdash;{" "}
              {formatDateInput(trip.endDate)}
            </>
          ) : (
            "-"
          )}
        </p>

        <div className={css.places_section}>
          <div className={css.places_header}>
            <strong>Places</strong>
            <div className={css.places_actions}>
              {canEditPlaces && (
                <button className={css.add_place_btn} onClick={openAddPlace}>
                  + Add place
                </button>
              )}
              <span className={css.places_count}>
                {sortedPlaces.length}{" "}
                {sortedPlaces.length === 1 ? "place" : "places"}
              </span>
            </div>
          </div>

          {sortedPlaces.length === 0 ? (
            <div className={css.empty_state}>
              <p className={css.placeholder}>The trip hasn't places yet.</p>
              {canEditPlaces && (
                <button className={css.add_place_btn} onClick={openAddPlace}>
                  Add first place
                </button>
              )}
            </div>
          ) : (
            <ul className={css.places_list}>
              {sortedPlaces.map((place) => (
                <li key={place.id}>
                  <PlaceItem
                    place={place}
                    canEdit={canEditPlaces}
                    onEdit={() =>
                      setPlaceStore({ editingPlace: place, isOpenModal: true })
                    }
                    onDelete={() => handleDeletePlaceConfirm(place.id)}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <AddEditPlaceModal
        onClose={() =>
          setPlaceStore({ editingPlace: null, isOpenModal: false })
        }
        onSubmit={async (values) => {
          const { editingPlace } = usePlaceStore.getState();

          if (editingPlace) {
            await handleUpdatePlace({ ...values, id: editingPlace.id });
          } else {
            const dayNum = Number(values.dayNumber);
            await handleCreatePlace({ ...values, dayNumber: dayNum });
          }
        }}
      />

      <ConfirmDialog
        onCancel={() => setConfirm({ isOpen: false, subject: null })}
        onConfirm={runConfirm}
      />
    </>
  );
}
