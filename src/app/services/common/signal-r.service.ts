import { Inject, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';
import { log } from 'util';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  constructor(@Inject("baseSignalRUrl") private baseSignalRUrl:string) { }
  start(hubUrl:string) {
      hubUrl = this.baseSignalRUrl + hubUrl;
      const builder: HubConnectionBuilder = new HubConnectionBuilder();

      const hubConnection : HubConnection = builder.withUrl(hubUrl)
      .withAutomaticReconnect()
      .build();
      hubConnection.start()
      .then(() => console.log("Connected"))
      .catch(() => setTimeout(() =>{ this.start(hubUrl)}, 2000))
      hubConnection.onreconnected(connectionId => console.log("Reconnected"));
      hubConnection.onreconnecting(error => console.log("Reconnecting"));
      hubConnection.onclose(error => console.log("Close reconnection"));   
      return hubConnection;
  }
  invoke(hubUrl:string,methodName:string , message:any , successCallBack?:(value) => void, errorCallBack?:(error) => void) {
    this.start(hubUrl).invoke(methodName, message)
      .then(successCallBack)
      .catch(errorCallBack);
  }

  on(hubUrl:string,methodName:string,callBack:(...message) => void) {
    this.start(hubUrl).on(methodName, callBack);
  }
}
