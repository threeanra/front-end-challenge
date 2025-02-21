/* eslint-disable react-hooks/rules-of-hooks */
import { axiosInstance } from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";

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


