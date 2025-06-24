export class LocalStorageService {
  getLastSearchTerm(): string | null {
    return localStorage.getItem('lastSearchTerm');
  }

  setLastSearchTerm(term: string): void {
    localStorage.setItem('lastSearchTerm', term);
  }
}
