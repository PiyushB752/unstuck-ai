"use client";

export function getClientId(): string {
  const storageKey = "unstuck-client-id";

  let clientId = localStorage.getItem(storageKey);

  if (!clientId || !/^[0-9a-f-]{36}$/i.test(clientId)) {
    clientId = crypto.randomUUID();
    localStorage.setItem(storageKey, clientId);
  }

  return clientId;
}