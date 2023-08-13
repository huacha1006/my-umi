import { extend } from 'umi-request';
import type { user } from '@/types/user';

const request = extend({
  // 配置项
});

export const GetAllUsersHttp = async (keyWord: string) =>
  await request(`/api/user?keyWord=${keyWord}`);

export const CreateUserHttp = async (data: user) =>
  await request(`/api/user`, {
    method: 'POST',
    data,
  });
