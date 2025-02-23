/* eslint-disable react-hooks/rules-of-hooks */
import { axiosInstance } from "@/lib/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const getPosts = ({
  page,
  perPage,
}: {
  page: number;
  perPage: number;
}) => {
  return useQuery({
    queryFn: async () => {
      const response = await axiosInstance.get(`/public/v2/posts`, {
        params: { page, per_page: perPage },
      });
      return response.data;
    },
    queryKey: ["get_posts", page, perPage],
  });
};

export const addPost = ({
  onSuccess,
  onError,
}: {
  onSuccess: (data: any) => void;
  onError: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, data }: { userId?: string; data: any }) => {
      const response = await axiosInstance.post(
        `/public/v2/users/${userId}/posts`,
        {
          title: data.title,
          body: data.post,
        }
      );
      return response.data;
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["get_posts"] });
      if (onSuccess) onSuccess(data);
    },
    onError: (error) => {
      if (onError) onError(error);
    },
  });
};
