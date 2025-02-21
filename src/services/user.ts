/* eslint-disable react-hooks/rules-of-hooks */
import { axiosInstance } from "@/lib/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const getUsers = ({
  page,
  perPage,
}: {
  page: number;
  perPage: number;
}) => {
  return useQuery({
    queryFn: async () => {
      const response = await axiosInstance.get(`/public/v2/users`, {
        params: { page, per_page: perPage },
      });
      return response.data;
    },
    queryKey: ["get_users", page, perPage],
    throwOnError: true,
  });
};

export const getUserById = ({ id }: { id: string }) => {
  return useQuery({
    queryFn: async () => {
      const response = await axiosInstance.get(`/public/v2/users/${id}`);
      return response.data;
    },
    queryKey: ["get_user_by_id", id],
  });
};

export const addUser = ({
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

export const editUser = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      const response = await axiosInstance.put(`/public/v2/users/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get_users"] });
      if (onSuccess) onSuccess();
    },
    onError: (error) => {
      if (onError) onError(error);
    },
  });
};

export const deleteUser = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      await axiosInstance.delete(`/public/v2/users/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get_users"] }); // Refresh data user yang dihapus
      if (onSuccess) onSuccess();
    },
    onError: (error) => {
      if (onError) onError(error);
    },
  });
};
