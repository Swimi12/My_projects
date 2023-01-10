import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

type ItemRequestData = {
  succes: boolean;
  message: string;
  _id: string;
  name: { ua: string; en: string };
  price: number;
  amount: number;
  description: { ua: string; en: string };
  nameFile: string;
};

type ItemRequestResponse = {
  succes: boolean;
  message: string;
};

type FileRequestResponse = {
  data: { name: string };
  succes: boolean;
  message: string;
};

@Injectable()
export class AdditemService {
  SERVER_URL = 'http://localhost:3000/upload';

  constructor(private http: HttpClient) {}

  addItem(data: ItemRequestData) {
    return this.http.post<ItemRequestResponse>(
      `${environment.api}/items/additems`,
      data
    );
  }

  onSubmit(formData: Object) {
    return this.http.post<FileRequestResponse>(this.SERVER_URL, formData);
  }
}
