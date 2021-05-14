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
  }
  /**
   * Popover Items funktions end
   */

}
