export function historyReplaceState(params?: URLSearchParams | null) {
  if (typeof window === "undefined") return;

  const query = params instanceof URLSearchParams ? params.toString() : "";
  const url = query ? `${window.location.pathname}?${query}` : window.location.pathname;

  try {
    history.replaceState(null, "", url);
  } catch (error) {
    console.error("Failed to push state to history:", error);
  }
}
