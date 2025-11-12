import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AccountInfo} from '@azure/msal-browser';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [JsonPipe],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile implements OnInit{

  protected userProfile: AccountInfo | null = null;

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.getUserProfile().subscribe(profile => {this.userProfile = profile;})
  }
  private getUserProfile(){
    return this.httpClient.get<any>('https://graph.microsoft.com/v1.0/me');
  }

}
