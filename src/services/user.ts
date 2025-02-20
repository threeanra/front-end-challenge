/* eslint-disable react-hooks/rules-of-hooks */
import { axiosInstance } from "@/lib/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const getUsers = ({
  page,
  perPage,
  onError,
}: {
  page: number;
  perPage: number;
  onError: (error: Error) => void;
}) => {
  const { error, ...result } = useQuery({
    queryFn: async () => {
      const response = await axiosInstance.get(`/public/v2/users`, {
        params: { page, per_page: perPage },
      });
      return response.data;
    },
    queryKey: ["get_user", page, perPage],
  });

  if (error) {
    onError(error);
  }

  return result;
};

export const getUserById = ({
  id,
  onError,
}: {
  id: string;
  onError: (error: Error) => void;
}) => {
  const { error, ...result } = useQuery({
    queryFn: async () => {
      const response = await axiosInstance.get(`/public/v2/users/${id}`);
      return response.data;
    },
    queryKey: ["get_user_by_id", id],
  });

  if (error) {
    onError(error);
  }

  return result;
};

export const editUser = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      const response = await axiosInstance.put(`/public/v2/users/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get_user"] });
      if (onSuccess) onSuccess();
    },
    onError: (error) => {
      if (onError) onError(error);
    },
  });
};
