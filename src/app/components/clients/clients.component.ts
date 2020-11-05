import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Client } from '../../models/Client';
@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients: Client[];
  totalOwed: number;

  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.clientService.getClients().subscribe(clients => {
      // console.log(clients);
      return this.clients = clients;
    });
    this.getTotalOwed();
    console.log(this.clients);

  }

  getTotalOwed() {
    
    this.totalOwed = this.clients.reduce((total, client) => {
      return total + client.balance;
    }, 0);
  }
}

