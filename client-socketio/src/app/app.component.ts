import { Component } from '@angular/core';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  messageList:  string[] = [];
  cesarService: any;

  constructor(private socketService: SocketService) {
  }

   sendMessage(message: HTMLInputElement) {
    let encoded = this.cesarService.encode(message.value, 10);
    this.socketService.sendMessage(encoded);
    //console.log("sent: " + message.value)
    message.value="";
  }
  ngOnInit() {
    this.socketService.getMessage()
      .subscribe((message: string) => {
        this.messageList.push(message);
        console.log("messagereceived: " + message)
      });
  }
}
