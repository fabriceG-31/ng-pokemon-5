import { Directive, ElementRef, HostListener, Input } from "@angular/core";

@Directive({
    selector: '[pkmnBorderCard]'
})

export class BorderCardDirective {

    private grayColor: string = '#f5f5f5';
    private highLightColor: string = '#008000';
    private cardHeight: number = 180;

    constructor(private el: ElementRef) {
        this.setBorder(this.grayColor);
        this.setHeight(this.cardHeight);
    }

    @Input('pkmnBorderCard') borderColor: string;

    @HostListener('mouseenter') onMouseEnter() {
        this.setBorder(this.borderColor || this.highLightColor);
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.setBorder(this.grayColor);
    }

    private setBorder(color: string) {
        let border = 'solid 4px ' + color;
        this.el.nativeElement.style.border = border;
    }

    private setHeight(height: number) {
        this.el.nativeElement.style.height = height;
    }
}