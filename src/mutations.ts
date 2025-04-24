import { useMutation, UseMutationResult } from "@tanstack/react-query";

import { ITrack } from "@/types";
import { API_BASE_URL } from "@/lib/constants";

export const useCreateTrack = (): UseMutationResult<ITrack> =>
  useMutation({
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
  });

export const useEditTrack = ({
  id,
}: {
  id: string;
}): UseMutationResult<ITrack> => {
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
  });
};

export const useDeleteTrack = ({ id }: { id: string }): UseMutationResult => {
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
  });
};

export const useUploadAudioFile = ({
  id,
}: {
  id: string;
}): UseMutationResult<ITrack, Error, FormData> => {
  return useMutation({
    mutationFn: async (formData) => {
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
  });
};
