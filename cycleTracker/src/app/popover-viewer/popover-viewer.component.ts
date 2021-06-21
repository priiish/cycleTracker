import { Component, OnInit } from '@angular/core';
import { PopoverController, } from '@ionic/angular';

@Component({
  selector: 'app-popover-viewer',
  templateUrl: './popover-viewer.component.html',
  styleUrls: ['./popover-viewer.component.scss'],
})
export class PopoverViewerComponent implements OnInit {
  /**
   * Popover Items funktions
   */

  constructor(private popoverController: PopoverController) { }
  logout() {
    // code for logout
    this.popoverController.dismiss();
  }
  // eslint-disable-next-line @typescript-eslint/naming-convention
  ngOnInit(): void {
    if(document.body.className == 'dark backdrop-no-scroll'){
      document.getElementById('dark__toggle').classList.add('toggle-checked');
    }
  }
  /**
   * Popover Items funktions end
   */
  /* Toggle-Button-Event */
  /**
   * No exception, problem with compiling ts and js
    * @param event
   */
  onClick(event){
    document.body.classList.toggle('dark');
    // eslint-disable-next-line @typescript-eslint/naming-convention
    document.getElementById("calendar__edit").classList.toggle('calender--black');
  }
}
