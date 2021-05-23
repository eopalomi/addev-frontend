import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagePageService {

  private message = new Subject<object>();
  public  messageObservable = this.message.asObservable();;

  constructor() { }

  showAlert(title: string, body: string, type: string) {   
    this.message.next({title, body, type});
  }

}


