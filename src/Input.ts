export const normalizeKey = (k: string) => k.toLowerCase();
export const mapArrow = (k: string) => {
  switch (k) {
    case 'arrowup':
      return 'w';
    case 'arrowdown':
      return 's';
    case 'arrowleft':
      return 'a';
    case 'arrowright':
      return 'd';
    default:
      return k;
  }
};
