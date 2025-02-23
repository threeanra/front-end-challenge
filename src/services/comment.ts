/* eslint-disable react-hooks/rules-of-hooks */

import { axiosInstance } from "@/lib/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const getComments = ({ postId }: { postId: string }) => {
  return useQuery({
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/public/v2/posts/${postId}/comments`
      );
      return response.data;
    },
    queryKey: ["get_comments", postId],
  });
};

export const postComment = ({
  onSuccess,
  onError,
}: {
  onSuccess: (data: any) => void;
  onError: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ postId, data }: { postId: string; data: any }) => {
      const response = await axiosInstance.post(
        `/public/v2/posts/${postId}/comments`,
        data
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["get_comments"] });
      if (onSuccess) onSuccess(data);
    },
    onError: (error) => {
      if (onError) onError(error);
    },
  });
};
