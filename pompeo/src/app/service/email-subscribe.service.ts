import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Language } from '../types/language.types';

type EmailSubscribeRequestData = {
  email: string;
  checkbox: boolean;
};

type EmailSubscribeRequestResponse = {
  status: boolean;
  message: string;
};

@Injectable()
export class EmailSubscribeService {
  constructor(private http: HttpClient) {}

  registration(data: EmailSubscribeRequestData, language: Language) {
    const headers = new HttpHeaders();
    headers.append('language', language);

    return this.http.post<EmailSubscribeRequestResponse>(
      `${environment.api}/subscribeEmail/subscription`,
      data,
      { headers }
    );
  }
}
