import { Component, Input, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Documento } from 'src/app/models/Documento';
import { DocumentosService } from 'src/app/providers/documentos/documentos.service';

@Component({
  selector: 'app-multimedia',
  templateUrl: './multimedia.component.html',
  styleUrls: ['./multimedia.component.css']
})
export class MultimediaComponent implements OnInit {

  @Input()
  anexo: Documento;

  @ViewChild('modal', {static: false})
  modalRef: ElementRef;

  loadingStyle: string;
  loading = true;
  image: string;

  constructor(private readonly documentosService: DocumentosService) { }

  ngOnInit(): void {
    this.image = this.anexo.rutaDeDescarga;
    this.loadingStyle = `rotate`;
  }

  showModal = () => {
    this.modalRef.nativeElement.style.display = 'block';
  }

  closeModal = () => {
    this.modalRef.nativeElement.style.display = 'none';
  }

  descargarArchivo = (documento: Documento): void => {
    this.documentosService.descargarDocumento(documento).subscribe(
      data => {
        const blob = new Blob([data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = documento.nombre;
        link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

        setTimeout(() => {
          window.open(url);
          link.remove();
        }, 100);
      });
  }

  onLoad() {
    this.loading = false;
  }

  // onError(){
  //   if(!!this.defaultImage){
  //     this.imageSource = this.defaultImage;
  //   } else {
  //     this.imageSource = 'assets/img/user.svg';
  //   }
  // }

}
