export default function getLastSearchTermFromLS(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('lastSearchTerm');
  }
  return null;
}
