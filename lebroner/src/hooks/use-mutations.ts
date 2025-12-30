import { useState } from "react";
import { mutate } from "swr";

async function apiRequest(url: string, method: string, body?: unknown) {
  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Something went wrong");
  }
  return res.json();
}

export function useCreatePost() {
  const [isMutating, setIsMutating] = useState(false);

  const trigger = async (data: { title: string; content: string; authorId: string; imageUrl?: string }) => {
    setIsMutating(true);
    try {
      const result = await apiRequest("/api/posts", "POST", data);
      mutate("/api/posts"); 
      return result;
    } finally {
      setIsMutating(false);
    }
  };

  return { trigger, isMutating };
}

export function useDeletePost() {
  const [isMutating, setIsMutating] = useState(false);

  const trigger = async (id: string) => {
    setIsMutating(true);
    try {
      await apiRequest(`/api/posts/${id}`, "DELETE");
      mutate("/api/posts"); 
    } finally {
      setIsMutating(false);
    }
  };

  return { trigger, isMutating };
}

export function useCreateHighlight() {
  const [isMutating, setIsMutating] = useState(false);

  const trigger = async (data: { title: string; videoUrl: string; description?: string }) => {
    setIsMutating(true);
    try {
      const result = await apiRequest("/api/highlights", "POST", data);
      mutate("/api/highlights");
      return result;
    } finally {
      setIsMutating(false);
    }
  };

  return { trigger, isMutating };
}

export function useCreateUser() {
  const [isMutating, setIsMutating] = useState(false);

  const trigger = async (data: { name: string; email: string; password: string }) => {
    setIsMutating(true);
    try {
      const result = await apiRequest("/api/users", "POST", data);
      mutate("/api/users");
      return result;
    } finally {
      setIsMutating(false);
    }
  };

  return { trigger, isMutating };
}
