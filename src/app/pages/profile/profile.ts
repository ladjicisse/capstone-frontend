import {Component, OnInit, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile implements OnInit{

  user = signal<any | null>(null);
  loading = signal<boolean>(true);

  constructor(private httpClient: HttpClient, private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getProfile().subscribe({
      next: (res) => {
        this.user.set(res);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }
  private getUserProfile(){
    return this.httpClient.get<any>('https://graph.microsoft.com/v1.0/me');
  }

}
