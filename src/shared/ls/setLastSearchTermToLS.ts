export default function setLastSearchTermToLS(term: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('lastSearchTerm', term);
  }
}
