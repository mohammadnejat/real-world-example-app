import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Header } from "../../shared/components/header/header";
import { Footer } from "../../shared/components/footer/footer";
import { ɵEmptyOutletComponent } from "@angular/router";

@Component({
  selector: 'app-page-wrapper',
  imports: [Header, Footer],
  templateUrl: './page-wrapper.html',
  styleUrl: './page-wrapper.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageWrapper {

}
