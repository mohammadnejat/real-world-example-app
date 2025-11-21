import { Component, signal } from '@angular/core';

import { PageWrapper } from './layout/page-wrapper/page-wrapper';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PageWrapper],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
