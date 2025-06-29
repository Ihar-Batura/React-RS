export default function getLastSearchTermFromLS(): string | null {
  return localStorage.getItem('lastSearchTerm');
}
