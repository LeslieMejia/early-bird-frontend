import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router'; // <- NOTICE: RouterLink is imported

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink], // <- RouterLink is included here too
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Early Bird Jobs';
}
