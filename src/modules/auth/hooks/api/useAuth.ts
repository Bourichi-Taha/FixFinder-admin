import ApiRoutes from '@common/defs/apiRoutes';
import { Id } from '@common/defs/types';
import useApi, { ApiOptions, ApiResponse, FetchApiOptions } from '@common/hooks/useApi';
import { User } from '@modules/users/defs/types';
import { useState } from 'react';
import useSWR from 'swr';

export interface LoginInput {
  email: string;
  password: string;
  admin: boolean;
}

export interface VerifyInput {
  hash: string;
  id: Id;
  signature: string;
  expires: string;
}

export interface RegisterInput {
  email: string;
  password: string;
}

export interface RequestPasswordResetInput {
  email: string;
}

export interface ResetPasswordInput {
  email: string;
  password: string;
  passwordConfirmation: string;
  token: string;
}

interface AuthData {
  user: User | null;
  login: (
    _input: LoginInput,
    _options?: FetchApiOptions
  ) => Promise<ApiResponse<{ token: string }>>;
  verify: (
    _input: VerifyInput,
    _options?: FetchApiOptions
  ) => Promise<ApiResponse<null>>;
  register: (
    _input: RegisterInput,
    _options?: FetchApiOptions
  ) => Promise<ApiResponse<null>>;
  logout: (_options?: FetchApiOptions) => Promise<ApiResponse<null>>;
  requestPasswordReset: (
    _input: RequestPasswordResetInput,
    _options?: FetchApiOptions
  ) => Promise<ApiResponse<null>>;
  resetPassword: (
    _input: ResetPasswordInput,
    _options?: FetchApiOptions
  ) => Promise<ApiResponse<{ token: string }>>;
  initialized: boolean; // This is used to prevent the app from rendering before the useAuth initial fetch is complete
}

const useAuth = (): AuthData => {
  const authEnabled = process.env.NEXT_PUBLIC_AUTH_ENABLED === 'true';
  if (!authEnabled) {
    return {
      initialized: true,
      user: null,
      login: async () => ({ success: false, errors: ['Auth is disabled'] }),
      register: async () => ({ success: false, errors: ['Auth is disabled'] }),
      logout: async () => ({ success: false, errors: ['Auth is disabled'] }),
      requestPasswordReset: async () => ({ success: false, errors: ['Auth is disabled'] }),
      resetPassword: async () => ({ success: false, errors: ['Auth is disabled'] }),
      verify: async () => ({ success: false, errors: ['Auth is disabled'] }),
    };
  }

  const [initialized, setInitialized] = useState<boolean>(false);

  const fetchApi = useApi();

  const { data: user, mutate } = useSWR<User | null>(ApiRoutes.Auth.Me, async (url) => {
    if (!localStorage.getItem('authToken')) {
      setInitialized(true);
      return null;
    }
    const options: ApiOptions = {
      method: 'POST',
    };
    const response = await fetchApi<{ user: User }>(url, options);
    const { success, data } = response;
    let returnedUser = null;
    if (!success) {
      localStorage.removeItem('authToken');
    } else {
      returnedUser = data?.user ?? null;
    }
    setInitialized(true);
    return returnedUser;
  });

  const login = async (input: LoginInput, options?: FetchApiOptions) => {
    const response = await fetchApi<{ token: string }>(ApiRoutes.Auth.Login, {
      body: input,
      ...options,
    });

    if (response.success && response.data?.token) {
      localStorage.setItem('authToken', response.data.token);
      mutate();
    }

    return response;
  };
  const verify = async (input: VerifyInput, options?: FetchApiOptions) => {
    const response = await fetchApi<null>(ApiRoutes.Auth.Verify.replace('{expires}',input.expires).replace('{hash}',input.hash).replace('{id}',input.id.toString()).replace('{signature}',input.signature), {
      body: input,
      ...options,
    });

    if (response.success && response.data) {
      mutate();

    }

    return response;
  };

  const register = async (input: RegisterInput, options?: FetchApiOptions) => {
    const response = await fetchApi<null>(ApiRoutes.Auth.Register, {
      body: input,
      ...options,
    });

    if (response.success && response.data) {
      mutate();
    }

    return response;
  };

  const logout = async (options?: FetchApiOptions) => {
    const response = await fetchApi<null>(ApiRoutes.Auth.Logout, { method: 'POST', ...options });
    localStorage.removeItem('authToken');
    mutate();
    return response;
  };

  const requestPasswordReset = async (
    input: RequestPasswordResetInput,
    options?: FetchApiOptions
  ) => {
    const response = await fetchApi<null>(ApiRoutes.Auth.RequestPasswordReset, {
      body: input,
      ...options,
    });
    return response;
  };

  const resetPassword = async (input: ResetPasswordInput, options?: FetchApiOptions) => {
    const response = await fetchApi<{ token: string }>(ApiRoutes.Auth.ResetPassword, {
      body: input,
      ...options,
    });
    return response;
  };

  return {
    user: user ?? null,
    login,
    register,
    logout,
    requestPasswordReset,
    resetPassword,
    initialized,
    verify
  };
};

export default useAuth;
