export default function setLastSearchTermToLS(term: string): void {
  localStorage.setItem('lastSearchTerm', term);
}
