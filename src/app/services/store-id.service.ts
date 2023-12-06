import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreIdService {

  constructor() { }

  saveLastId(key:string,value:number){
    let valueStr = JSON.stringify(value);
    localStorage.setItem(key,valueStr)
  }

  getId(key:string){
    const data = localStorage.getItem(key);
    let id = data !== null ? parseInt(JSON.parse(data)) : 0;
    return id;
  }


}
