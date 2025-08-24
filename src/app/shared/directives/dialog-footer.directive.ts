import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[dialogFooter]',
  standalone: true,
})
export class DialogFooterDirective implements OnInit {

  /*
  const ref: DynamicDialogRef = this.dialogService.open(CreateCategoryComponent, {
    header: 'Tạo danh mục',
    width: '50vw',
    contentStyle: { overflow: 'auto' },
    breakpoints: {
      '960px': '75vw',
      '640px': '90vw',
    },
    styleClass: 'p-dialog-custom',
    maximizable: true,
    data: {
      isNew: true,
    },
  });
  */


  @Input({ required: true }) classDialog: string = ''; // nên đặt mỗi dialog 1 class riêng ở styleClass
  constructor(private el: ElementRef) { }
  ngOnInit(): void {
    this.positionFooter();
  }

  private positionFooter() {

    if (this.classDialog) {
      this.el.nativeElement.classList.add('p-dialog-footer');

      const dialog = document.getElementsByClassName(this.classDialog)[0];
      if (dialog) dialog.appendChild(this.el.nativeElement);
    }
  }
}
