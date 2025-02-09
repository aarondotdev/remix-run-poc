import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import useSWR from 'swr';

type PermissionStore = {
  permissions: string[];
  isLoading: boolean;
  error: string | null;
  setPermissions: (data: string[]) => void;
  setError: (error: string | null) => void;
  setLoading: (isLoading: boolean) => void;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const usePermissionStore = create<
  PermissionStore,
  [['zustand/persist', PermissionStore]]
>(
  persist<PermissionStore>(
    (set) => ({
      permissions: [],
      isLoading: true,
      error: null,
      setPermissions: (data: string[]) =>
        set({ permissions: data, isLoading: false }),
      setError: (error: string | null) => set({ error, isLoading: false }),
      setLoading: (isLoading: boolean) => set({ isLoading })
    }),
    {
      name: 'permissions-storage',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);

export const useFetchPermissions = () => {
  // const { setPermissions, setError, setLoading } = usePermissionStore();

  const {
    data: permissions,
    error,
    isLoading,
    mutate
  } = useSWR('/api/permissions', fetcher, {
    revalidateOnFocus: false,
    refreshInterval: 0
    //onSuccess: (data) => setPermissions(data?.data),
    //onError: (error) => setError(error.message)
    //onLoadingSlow: () => setLoading(true)
  });

  return { permissions, error, mutate, isLoading };
};

export default usePermissionStore;
