import { Component, ElementRef, OnInit, Renderer2, ViewChild, HostListener, OnDestroy, AfterViewInit } from '@angular/core';
import { ApiHandlerService } from '../services/api-handler.service';

@Component({
  selector: 'app-image-register',
  templateUrl: './image-register.component.html',
  styleUrls: ['./image-register.component.css']
})

export class ImageRegisterComponent implements OnInit, OnDestroy {
  @ViewChild('video', { static: true }) videoElement: ElementRef;
  @ViewChild('canvas', { static: true }) canvas: ElementRef;
  @ViewChild('canvas2', { static: true }) canvas2: ElementRef;
  @ViewChild('canvas3', { static: true }) canvas3: ElementRef;
  @ViewChild('canvas4', { static: true }) canvas4: ElementRef;
  @ViewChild('canvas5', { static: true }) canvas5: ElementRef;
  @ViewChild('canvas6', { static: true }) canvas6: ElementRef;

  isMobileBrowser = true;
  videoWidth = 0;
  videoHeight = 0;
  imgURL: any
  imageDatas: any[] = []
  nextNumberImage: number = 0


  constraints = {
    audio: false,
    video: {
      facingMode: "environment",
      width: { min: 1024, max: 1920 },
      height: { min: 576, max: 1080 },
      frameRate: { ideal: 10, max: 15 }
    }
  };
  mediaStream: MediaStream = null;

  constructor(private renderer: Renderer2,
    private el: ElementRef, private serviceHandler: ApiHandlerService) {

  }

  ngOnInit(): void {
    this.isMobileBrowser = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    if (this.isMobileBrowser == false) {
      this.startCamera()
    }
  }

  handleFileInput(files: FileList) {
    //alert(files.item(0))
    // const context2d = this.canvas.nativeElement.getContext('2d');
    // var imageData = context2d.createImageData(files.item(0), this.canvas.nativeElement.width, this.canvas.nativeElement.height);

    // context2d.putImageData(imageData, 0, 0);

    this.preview(files)

  }

  preview(files: any) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      // this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }


  @HostListener('window:popstate', ['$event']) onPopState(event: any) {
    console.log('Back button pressed', event);
  }

  startCamera() {
    this.stopMediaTracks()

    if (!!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
      navigator.mediaDevices.getUserMedia(this.constraints)
        .then(
          this.attachVideo.bind(this))
        .catch(this.handleError);
    } else {
      alert('Rất tiếc, camera chưa sẵn sàng.');
    }
  }

  handleError(error) {
    console.log('Error: ', error);
  }

  attachVideo(stream: any) {
    this.mediaStream = stream;
    console.log('Stream info: ', stream)
    this.renderer.setProperty(this.videoElement.nativeElement, 'srcObject', stream);
    this.renderer.listen(this.videoElement.nativeElement, 'play', (event) => {
      this.videoHeight = this.videoElement.nativeElement.videoHeight;
      this.videoWidth = this.videoElement.nativeElement.videoWidth;
    });
  }

  capture() {
    switch (this.nextNumberImage) {
      case 0:
        this.renderer.setProperty(this.canvas.nativeElement, 'width', this.videoWidth);
        this.renderer.setProperty(this.canvas.nativeElement, 'height', this.videoHeight);

        this.canvas.nativeElement.getContext('2d').drawImage(this.videoElement.nativeElement, 0, 0);
        var imageData: ImageData = null;
        imageData = this.canvas.nativeElement.getContext('2d').getImageData(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

        if (imageData) {
          this.nextNumberImage = 1;
          this.imageDatas.push(imageData)
        }

        break
      case 1:
        this.renderer.setProperty(this.canvas2.nativeElement, 'width', this.videoWidth);
        this.renderer.setProperty(this.canvas2.nativeElement, 'height', this.videoHeight);

        this.canvas2.nativeElement.getContext('2d').drawImage(this.videoElement.nativeElement, 0, 0);
        var imageData: ImageData = null;
        imageData = this.canvas2.nativeElement.getContext('2d').getImageData(0, 0, this.canvas2.nativeElement.width, this.canvas2.nativeElement.height);

        if (imageData) {
          this.nextNumberImage = 2;
          this.imageDatas.push(imageData)
        }
        break
      case 2:
        this.renderer.setProperty(this.canvas3.nativeElement, 'width', this.videoWidth);
        this.renderer.setProperty(this.canvas3.nativeElement, 'height', this.videoHeight);

        this.canvas3.nativeElement.getContext('2d').drawImage(this.videoElement.nativeElement, 0, 0);
        var imageData: ImageData = null;
        imageData = this.canvas3.nativeElement.getContext('2d').getImageData(0, 0, this.canvas3.nativeElement.width, this.canvas3.nativeElement.height);

        if (imageData) {
          this.nextNumberImage = 3;
          this.imageDatas.push(imageData)
        }
        break
      case 3:
        this.renderer.setProperty(this.canvas4.nativeElement, 'width', this.videoWidth);
        this.renderer.setProperty(this.canvas4.nativeElement, 'height', this.videoHeight);

        this.canvas4.nativeElement.getContext('2d').drawImage(this.videoElement.nativeElement, 0, 0);
        var imageData: ImageData = null;
        imageData = this.canvas4.nativeElement.getContext('2d').getImageData(0, 0, this.canvas4.nativeElement.width, this.canvas4.nativeElement.height);

        if (imageData) {
          this.nextNumberImage = 4;
          this.imageDatas.push(imageData)
        }
        break
      case 4:
        this.renderer.setProperty(this.canvas5.nativeElement, 'width', this.videoWidth);
        this.renderer.setProperty(this.canvas5.nativeElement, 'height', this.videoHeight);

        this.canvas5.nativeElement.getContext('2d').drawImage(this.videoElement.nativeElement, 0, 0);
        var imageData: ImageData = null;
        imageData = this.canvas5.nativeElement.getContext('2d').getImageData(0, 0, this.canvas5.nativeElement.width, this.canvas5.nativeElement.height);

        if (imageData) {
          this.nextNumberImage = 5;
          this.imageDatas.push(imageData)
        }
        break
      case 5:
        this.renderer.setProperty(this.canvas6.nativeElement, 'width', this.videoWidth);
        this.renderer.setProperty(this.canvas6.nativeElement, 'height', this.videoHeight);

        this.canvas6.nativeElement.getContext('2d').drawImage(this.videoElement.nativeElement, 0, 0);
        var imageData: ImageData = null;
        imageData = this.canvas6.nativeElement.getContext('2d').getImageData(0, 0, this.canvas6.nativeElement.width, this.canvas6.nativeElement.height);

        if (imageData) {
          this.nextNumberImage = 1;
          this.imageDatas.push(imageData)
        }
        break
    }

  }

  register() {
    var formData = new FormData()
    for (let index = 0; index < this.imageDatas.length; index++) {
      const element = this.imageDatas[index];
      var fileName = 'file' + index
      formData.append(fileName, element)
    }
    this.serviceHandler.uploadFiles(formData)
  }

  setNextNumberImage(e: number) {
    this.nextNumberImage = e
  }
  private stopMediaTracks() {

    if (this.mediaStream && this.mediaStream.getTracks) {
      // getTracks() returns all media tracks (video+audio)
      this.mediaStream.getTracks()
        .forEach((track: MediaStreamTrack) => track.stop());
    }
  }

  public ngOnDestroy(): void {
    this.stopMediaTracks();
  }
}
