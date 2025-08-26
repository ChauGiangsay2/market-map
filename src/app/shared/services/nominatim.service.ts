// src/app/services/nominatim.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface NominatimPlace {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
  boundingbox?: [string, string, string, string];
  type?: string;
  class?: string;
  icon?: string;
  address?: Record<string, string>;

}

@Injectable({ providedIn: 'root' })
export class NominatimService {
  private base = environment.nominatimBaseUrl;

  constructor(private http: HttpClient) {}

  search(opts: {
    q: string;
    limit?: number;
    viewbox?: string; // "minLon,minLat,maxLon,maxLat"
    bounded?: boolean;
    countrycodes?: string; // e.g. "vn,us"
    lang?: string;         // e.g. "vi,en"
  }): Observable<NominatimPlace[]> {
    if (!opts.q?.trim()) return of([]);

    let params = new HttpParams()
      .set('q', opts.q.trim())
      .set('format', 'jsonv2')
      .set('addressdetails', '1')
      .set('limit', String(opts.limit ?? 8));

    if (opts.viewbox) params = params.set('viewbox', opts.viewbox);
    if (opts.bounded) params = params.set('bounded', '1');
    if (opts.countrycodes) params = params.set('countrycodes', opts.countrycodes);
    if (opts.lang) params = params.set('accept-language', opts.lang);

    // NOTE: Browser can't set User-Agent; rely on Referer. Keep requests modest (rate limits).
    return this.http
      .get<NominatimPlace[]>(`${this.base}/search`, { params })
      .pipe(catchError(() => of([])));
  }
}
