import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Language } from '../types/language.types';

type AutorizationRequestData = {
  email: string;
  password: string;
};

type AutorizationRequestResponse = {
  succes: boolean;
  message: string;
};

@Injectable()
export class AutorizationService {
  constructor(private http: HttpClient) {}

  authorization(data: AutorizationRequestData, language: Language) {
    const headers = new HttpHeaders();
    headers.append('language', language);

    return this.http.post<AutorizationRequestResponse>(
      `${environment.api}/users/authorization`,
      data,
      { headers }
    );
  }
}
