import { Component } from '@angular/core';
import { NavBarComponent } from '../../component/nav-bar/nav-bar.component';
import { LeftSideComponent } from '../../component/left-side/left-side.component';
import { MainSideComponent } from '../../component/main-side/main-side.component';
import { RightSideComponent } from '../../component/right-side/right-side.component';

@Component({
  selector: 'app-main',
  imports: [
    NavBarComponent,
    LeftSideComponent,
    MainSideComponent,
    RightSideComponent,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  standalone: true,
})
export class MainComponent {}
