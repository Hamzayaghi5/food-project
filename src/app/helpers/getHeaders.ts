import { HttpClient, HttpHeaders } from '@angular/common/http';

export function getHeaders(): HttpHeaders {
    const headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
    return headers;
}