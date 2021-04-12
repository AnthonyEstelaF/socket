import { Component } from '@angular/core';
import { SocketService } from './socket.service';
import { CesarService } from './cesar.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  messageList:  string[] = [];
  obs: Observable<unknown>;

  constructor(private socketService: SocketService, private cesarService: CesarService) {
  }

   sendMessage(message: HTMLInputElement) {
    let encoded = this.cesarService.encode(message.value, 10);
    this.socketService.sendMessage(encoded);
    //console.log("sent: " + message.value)
    message.value="";
  }
  getMessage(message)
  {
    let encoded=this.cesarService.decode(message,10);
    this.messageList.push(encoded);
  }
  ngOnInit() {
   this.obs=this.socketService.getMessage();
   this.obs.subscribe(this.getMessage);
  }
}
