import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../../../environments/environment';
import { Language } from 'src/app/types/language.types';

type RegistrationRequestData = {
  role: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
};

type RegistrationRequestResponse = {
  status: boolean;
  message: string;
};

@Injectable()
export class RegestrationService {
  constructor(private http: HttpClient) {}

  registration(data: RegistrationRequestData, language: Language) {
    const headers = new HttpHeaders();
    headers.append('language', language);

    return this.http.post<RegistrationRequestResponse>(
      `${environment.api}/users/registration`,
      data,
      { headers }
    );
  }
}
