import { extend } from 'umi-request';
import type { user } from '@/types/user';

const request = extend({
  // 配置项
});

export const GetAllUsersHttp = async ({ keyWord, pageSize, current }: any) =>
  await request(
    `/api/user?keyWord=${keyWord}&pageSize=${pageSize}&current=${current}`,
  );

export const CreateUserHttp = async (data: user) =>
  await request(`/api/user`, {
    method: 'POST',
    data,
  });

export const UpdataAllUsersHttp = async (id: string, data: user) =>
  await request(`/api/user/${id}`, {
    method: 'PATCH',
    data,
  });

export const DeleteAllUsersHttp = async (id: string) =>
  await request(`/api/user/${id}`, {
    method: 'DELETE',
  });
