import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'display-message',
  templateUrl: './display-message.component.html',
  styleUrls: ['./display-message.component.scss'],
})
export class DisplayMessageComponent implements OnInit {
  constructor(private translate: TranslateService) {}

  showMessage: boolean = false;
  showError: boolean = false;

  messageKey: string = '';
  errorKey: string = '';

  messageSubscription: any;

  @Input() show: boolean;
  @Input() display: object;

  ngOnChanges(change) {
    if (change.display) {
      if (change.display.currentValue.message != '') {
        this.messageKey =
          'PROFILE.MESSAGES.' + change.display.currentValue.message;
      } else {
        this.messageKey = '';
      }

      if (change.display.currentValue.error != '') {
        this.errorKey = 'PROFILE.ERRORS.' + change.display.currentValue.error;
      } else {
        this.errorKey = '';
      }
    }
  }

  ngOnInit(): void {}
}
