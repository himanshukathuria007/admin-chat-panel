
import {
  Component,
  ChangeDetectionStrategy,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ElementRef
} from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { IPMessage, IUser,IConfig } from "../../../assets/interfaces/shared.interface";



@Component({
  selector: 'app-private-area',
  templateUrl: './private-area.component.html',
  styleUrls: ['./private-area.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrivateAreaComponent  {
  constructor() {}
  @Input() pmessages: IPMessage[];
  @Input() selectedUser: IUser;
  
  
  @Output() onMessage = new EventEmitter<string>();         //here comes selected user

  @ViewChild("text", { static: true }) nameField: ElementRef;
  





  public handleMessage(pmessage: string) {
    this.onMessage.emit(pmessage);
  }
}