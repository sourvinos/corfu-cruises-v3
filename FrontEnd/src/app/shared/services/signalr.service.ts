import * as signalR from '@microsoft/signalr'
import { Injectable } from '@angular/core'
import { MessagePackHubProtocol } from '@microsoft/signalr-protocol-msgpack'
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr'
// Custom
import { environment } from 'src/environments/environment'

@Injectable({ providedIn: 'root' })

export class SignalrService {

    private hubConnection: HubConnection
    private connectionUrl = 'https://localhost:5001/customers'
    public messages: string[] = []

    public connect = (): void => {
        this.startConnection()
        this.addListeners()
    }

    private getConnection(): HubConnection {
        return new HubConnectionBuilder()
            .withUrl(this.connectionUrl)
            .withHubProtocol(new MessagePackHubProtocol())
            .build();
    }
    private startConnection(): void {
        this.hubConnection = this.getConnection()
        this.hubConnection.start()
            .then(() => console.log('connection started'))
            .catch((err) => console.log('error while establishing signalr connection: ' + err))
    }

    private addListeners(): void {
        this.hubConnection.on("messageReceivedFromApi", (data: chatMesage) => {
            console.log('message received from API Controller')
            this.messages.push(data);
        })
        this.hubConnection.on('messageReceivedFromHub', (data: chatMesage) => {
            console.log('message received from Hub')
            this.messages.push(data);
        })
        this.hubConnection.on('newUserConnected', _ => {
            console.log('new user connected")
        })
    }

    // private connection = new signalR.HubConnectionBuilder().withUrl(environment.url + '/customers').build()

    // public startConnection(): void {
    //     this.connection.on('MessageReceived', (message) => {
    //         console.log(message)
    //     })
    //     this.connection.start()
    // }

}
