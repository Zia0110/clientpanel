import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Client } from '../../models/Client';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  }

  disableBalanceOnAdd: boolean = true;

  @ViewChild('clientForm') form: any;

  constructor(
    private flashMessage: FlashMessagesService,
    private clientService: ClientService,
    private router: Router) { }

  ngOnInit(): void {
  }


  onSubmit({ value, valid }: { value: Client, valid: boolean }) {

    console.log(value, valid);
    if (this.disableBalanceOnAdd) {
      value.balance = 0;
    }
    if (!valid) {
      //show flash message
      this.flashMessage.show('Please fill out the form correctly', { cssClass: 'alert-danger', timeout: 4000 })
    } else {
      //add new client
      this.clientService.newClient(value);
      //show message
      this.flashMessage.show('New client added', { cssClass: 'alert-success', timeout: 4000 })
      // redirect to dashboard
      this.router.navigate(['/']);
    }
  }
}
