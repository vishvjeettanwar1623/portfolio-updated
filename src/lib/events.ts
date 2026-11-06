type PortfolioEvents = {
  portfolio_menu_toggle: { isOpen: boolean };
  portfolio_swarm_start: void;
  open_contact_pass: void;
};

export function emitPortfolioEvent<K extends keyof PortfolioEvents>(
  event: K,
  detail?: PortfolioEvents[K]
): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(event, { detail }));
}

export function subscribePortfolioEvent<K extends keyof PortfolioEvents>(
  event: K,
  callback: (detail: PortfolioEvents[K]) => void
): () => void {
  if (typeof window === "undefined") return () => {};

  const handler = (e: Event) => {
    callback((e as CustomEvent<PortfolioEvents[K]>).detail);
  };

  window.addEventListener(event, handler);
  return () => window.removeEventListener(event, handler);
}

