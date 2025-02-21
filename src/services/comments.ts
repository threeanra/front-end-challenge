/* eslint-disable react-hooks/rules-of-hooks */

import { axiosInstance } from "@/lib/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const getComments = ({ post_id }: { post_id: number }) => {
  return useQuery({
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/public/v2/posts/${post_id}/comments`
      );
      return response.data;
    },
    queryKey: ["get_posts", post_id],
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
    mutationFn: async ({ data }: { data: any }) => {
      const response = await axiosInstance.post(`/public/v2/users`, data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["get_users"] });
      if (onSuccess) onSuccess(data);
    },
    onError: (error) => {
      if (onError) onError(error);
    },
  });
};
