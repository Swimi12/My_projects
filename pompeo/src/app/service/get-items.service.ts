import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IItems } from './../types/item.types';

type ItemRequestData = {
  id: string;
};

type ItemRequestResponse = {
  succes: boolean;
  message: string;
  _id: string;
  name: { ua: string; en: string };
  price: number;
  amount: number;
  description: { ua: string; en: string };
  nameFile: string;
};

type UpdateItemRequestData = {
  _id: string;
  name: { ua: string; en: string };
  price: number;
  amount: number;
  description: { ua: string; en: string };
};

@Injectable()
export class GetItemsService {
  constructor(private http: HttpClient) {}

  getItems() {
    return this.http.get<ItemRequestResponse[]>(
      `${environment.api}/items/additems`
    );
  }

  getItem(data: ItemRequestData) {
    return this.http.post<ItemRequestResponse>(
      `${environment.api}/items/getItem`,
      data
    );
  }

  deleteItem(id: string) {
    return this.http.delete<ItemRequestResponse[]>(
      `${environment.api}/items/deleteItem/` + id
    );
  }

  updateItem(data: UpdateItemRequestData) {
    console.log('data: ', data);
    return this.http.put<ItemRequestResponse>(
      `${environment.api}/items/updateItem`,
      data
    );
  }
}
