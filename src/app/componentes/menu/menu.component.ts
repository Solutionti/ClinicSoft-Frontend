import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterOutlet, RouterLink,MenuComponent],
  templateUrl: './menu.component.html',
})

export class MenuComponent {

}
