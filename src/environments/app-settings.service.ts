import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppSettings {

  public static PARSE_ENDPOINT='https://fast-brook-55083.herokuapp.com/parse';
  public static APP_KEY = 'za6uzD6NSUgIZrHOQf1OZhnVab74JhtyvByU90TN';
  public static MASTER_KEY = 'v4kPcjFW35f7vUHx8TG9oE3GUGdHQx3KlUA71Sj4';

  

  constructor() { }
}
