import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';   // ⬅️ import it

@Component({
  selector: 'app-home',
  standalone: true,
  // add RouterLink to the imports array ⬇️
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {}
