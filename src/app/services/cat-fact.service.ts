import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface CatFactData {
  fact: string;
}

@Injectable({ providedIn: 'root' })
export class CatFactService {
  private readonly CAT_FACT_URL = 'https://catfact.ninja/fact ';
  private readonly GIPHY_API_KEY = 'voaNIOg1u7ONPbckzWK71C48YqCOkhVP';
  private readonly GIPHY_SEARCH_URL = 'https://api.giphy.com/v1/gifs/search';

  constructor(private http: HttpClient) {}

  /**
   * Obtiene un dato aleatorio sobre gatos
   */
  getCatFact(): Observable<CatFactData> {
    return this.http.get<CatFactData>(this.CAT_FACT_URL);
  }

  /**
   * Busca un GIF relacionado con la consulta dada
   */
  getGifFromFact(query: string): Observable<any> {
    if (!query.trim()) {
      return of(null); // Si no hay query, devolvemos null
    }

    const encodedQuery = encodeURIComponent(query.trim());
    const url = `${this.GIPHY_SEARCH_URL}?api_key=${this.GIPHY_API_KEY}&q=${encodedQuery}&limit=1`;

    return this.http.get(url).pipe(
      catchError((err) => {
        console.error('Error al obtener GIF:', err);
        return of(null); // Devuelve null en caso de error
      })
    );
  }
}