import { useMutation, UseMutationResult } from "@tanstack/react-query";

import { API_BASE_URL } from "@/lib/constants";

export const useCreateTrack = (): UseMutationResult =>
  useMutation({
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
