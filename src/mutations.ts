import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";

import {
  ITrack,
  OptimisticGetTracksQueryResultPartial,
  TTrackForm,
} from "@/types";
import { API_BASE_URL } from "@/lib/constants";
import { GetTracksQueryResult } from "@/queries";
import { useTracksListState } from "@/hooks/useTracksListState";

export const useCreateTrack = () => {
  const queryClient = useQueryClient();
  const { tracksListState } = useTracksListState();

  return useMutation({
    mutationKey: ["createTrack"],
    mutationFn: async (formData) => {
      const response = await fetch(API_BASE_URL + "/tracks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      return data;
    },
    onMutate: async (newTrack: TTrackForm) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({
        queryKey: ["tracks", tracksListState],
      });

      // Snapshot the previous value
      const previousTracks = queryClient.getQueryData([
        "tracks",
        tracksListState,
      ]);

      // Optimistically update to the new value
      queryClient.setQueryData<OptimisticGetTracksQueryResultPartial>(
        ["tracks", tracksListState],
        (old) => {
          if (!old) return;

          const newData = old.data;
          newData.pop();
          newData.unshift({
            id: "optimistic",
            ...newTrack,
          });

          const newTotal = old.meta.total + 1;
          const newTotalPages = Math.ceil(newTotal / old.meta.limit);

          const newMeta = {
            ...old.meta,
            total: newTotal,
            totalPages: newTotalPages,
          };

          return {
            data: newData,
            meta: newMeta,
          };
        },
      );

      // Return a context object with the snapshotted value
      return { previousTracks };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(
        ["tracks", tracksListState],
        context?.previousTracks ?? {},
      );
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["tracks", tracksListState] }),
  });
};

export const useEditTrack = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();
  const { tracksListState } = useTracksListState();

  return useMutation({
    mutationKey: ["editTrack"],
    mutationFn: async (formData) => {
      const response = await fetch(API_BASE_URL + `/tracks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      return data;
    },
    onMutate: async (updatedTrack: TTrackForm) => {
      await queryClient.cancelQueries({
        queryKey: ["tracks", tracksListState],
      });

      const previousTracks = queryClient.getQueryData([
        "tracks",
        tracksListState,
      ]);

      queryClient.setQueryData<OptimisticGetTracksQueryResultPartial>(
        ["tracks", tracksListState],
        (old) => {
          if (!old) return;

          const updatedData = old.data.map((item) =>
            item.id === id ? { id, ...updatedTrack } : item,
          );

          return {
            ...old,
            data: updatedData,
          };
        },
      );

      return { previousTracks };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(
        ["tracks", tracksListState],
        context?.previousTracks ?? {},
      );
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["tracks", tracksListState] }),
  });
};

export const useDeleteTrack = ({ id }: { id: string }): UseMutationResult => {
  const queryClient = useQueryClient();
  const { tracksListState } = useTracksListState();

  return useMutation({
    mutationKey: ["deleteTrack"],
    mutationFn: async () => {
      const response = await fetch(API_BASE_URL + `/tracks/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      return "Track deleted successfully";
    },
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ["tracks", tracksListState],
      });

      const previousTracks = queryClient.getQueryData([
        "tracks",
        tracksListState,
      ]);

      queryClient.setQueryData<GetTracksQueryResult>(
        ["tracks", tracksListState],
        (old) => {
          if (!old) return;

          const updatedData = old.data.filter((item) => item.id !== id);

          const newTotal = old.meta.total - 1;
          const newTotalPages = Math.ceil(newTotal / old.meta.limit);

          const newMeta = {
            ...old.meta,
            total: newTotal,
            totalPages: newTotalPages,
          };

          return {
            data: updatedData,
            meta: newMeta,
          };
        },
      );

      return { previousTracks };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(
        ["tracks", tracksListState],
        context?.previousTracks ?? {},
      );
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["tracks", tracksListState] }),
  });
};

export const useUploadAudioFile = ({
  id,
}: {
  id: string;
}): UseMutationResult<ITrack, Error, FormData> => {
  return useMutation({
    mutationKey: ["uploadAudioFile", id],
    mutationFn: async (formData) => {
      await new Promise((resolve) => setTimeout(resolve, 3000));

      const response = await fetch(API_BASE_URL + `/tracks/${id}/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      return data;
    },
  });
};

export const useDeleteAudioFile = ({
  id,
}: {
  id: string;
}): UseMutationResult => {
  const queryClient = useQueryClient();
  const { tracksListState } = useTracksListState();

  return useMutation({
    mutationFn: async () => {
      const response = await fetch(API_BASE_URL + `/tracks/${id}/file`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      return "Track's audio file deleted successfully";
    },
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ["tracks", tracksListState],
      });

      const previousTracks = queryClient.getQueryData([
        "tracks",
        tracksListState,
      ]);

      queryClient.setQueryData<GetTracksQueryResult>(
        ["tracks", tracksListState],
        (old) => {
          if (!old) return;

          const updatedData = old.data.map((item) =>
            item.id === id ? { ...item, audioFile: "" } : item,
          );

          return {
            ...old,
            data: updatedData,
          };
        },
      );

      return { previousTracks };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(
        ["tracks", tracksListState],
        context?.previousTracks ?? {},
      );
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["tracks", tracksListState] }),
  });
};
