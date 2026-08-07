const transitions: Record<string, string[]> = {
  pending: ["approved", "published", "rejected", "archived", "contacted"],
  approved: ["published", "rejected", "archived"],
  published: ["archived"],
  rejected: ["pending", "archived"],
  new: ["contacted", "qualified", "resolved", "archived"],
  contacted: ["qualified", "resolved", "archived"],
  qualified: ["resolved", "archived"],
  resolved: ["archived"],
  draft: ["pending", "published", "archived"],
};

export function canModerateTransition(from: string, to: string) {
  return from === to || Boolean(transitions[from]?.includes(to));
}
