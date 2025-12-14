import useSWR from "swr";
import { type Highlight, type Post, type User } from "@/db/schema";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function usePosts() {
  const { data, error, isLoading, mutate } = useSWR<{ post: Post; author: { id: string; name: string } | null }[]>(
    "/api/posts",
    fetcher
  );

  return {
    posts: data,
    isLoading,
    isError: error,
    mutate,
  };
}

export function usePost(id: string | null) {
  const { data, error, isLoading, mutate } = useSWR<{ post: Post; author: { id: string; name: string } | null }>(
    id ? `/api/posts/${id}` : null,
    fetcher
  );

  return {
    post: data,
    isLoading,
    isError: error,
    mutate,
  };
}

export function useHighlights() {
  const { data, error, isLoading, mutate } = useSWR<Highlight[]>(
    "/api/highlights",
    fetcher
  );

  return {
    highlights: data,
    isLoading,
    isError: error,
    mutate,
  };
}

export function useUsers() {
  const { data, error, isLoading, mutate } = useSWR<User[]>(
    "/api/users",
    fetcher
  );

  return {
    users: data,
    isLoading,
    isError: error,
    mutate,
  };
}
