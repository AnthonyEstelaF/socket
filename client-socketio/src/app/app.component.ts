import { Component } from '@angular/core';
import { SocketService } from './socket.service';
import { CesarService } from './cesar.service';
import { Observable } from 'rxjs';
import {FormData} from './form.data.model';
import { CryptoService } from './crypto.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  messageList:  string[] = [];
  obs: Observable<unknown>;
  offset: string;
  message:string;

  constructor(private socketService: SocketService, private cesarService: CesarService, private cryptoService: CryptoService) {}
    setEncryptionKey(encryptionKey:HTMLInputElement)
    {
      this.offset=encryptionKey.value;
    }
    sendMessage(formData: FormData) {

    console.log("form input: " + JSON.stringify(formData));

    let encoded: FormData = formData; //Preparo una variabile da criptare
    switch (formData.messageType) {
      //Se il tipo di messaggio è cesar allora cripto con cesarService
      case "cesar":
        encoded.message = this.cesarService.encode(formData.message, Number(this.offset));
        break;
      //Se il tipo di messaggio è t-des allora cripto con cryptoService.encodeDes
      case "t-des":
        encoded.message = this.cryptoService.encodeDes(formData.message, this.offset);
        break;
    }
    //Invio il messaggio cifrato
    this.socketService.sendMessage(JSON.stringify(encoded));

    this.message = "";
  }

  ngOnInit() {
    this.socketService.getMessage().subscribe((message: string) => {
      let decoded = this.cesarService.decode(message, 7)
      this.messageList.push(decoded);
      console.log("message received:", decoded)
    });
  }
}
