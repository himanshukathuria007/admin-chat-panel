import {
  Component,
  ChangeDetectionStrategy,
  EventEmitter,
  Output
} from "@angular/core";
import { IConfig } from "../../../assets/interfaces/shared.interface";
import { CONFIG,PCONFIG } from "./chat-name-popup.constants";

@Component({
  selector: "chat-name-popup",
  templateUrl: "./chat-name-popup.component.html",
  styleUrls: ["./chat-name-popup.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatNamePopupComponent {
  constructor() {}
  @Output() onUserNameChange = new EventEmitter<string>();
  @Output() onUserPrivateNameChange = new EventEmitter<string>();
  public config: IConfig = CONFIG;
  public pconfig: IConfig = PCONFIG;

  public handleUserName(name: string) {
    this.onUserNameChange.emit(name);
  }

  public handleprivateUserName(name: string) {
    this.onUserPrivateNameChange.emit(name);
  }

}
