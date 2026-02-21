import { EventEmitter, Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.models';
import { BehaviorSubject, min, Observable, Observer, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {

  callback: EventEmitter<any>= new EventEmitter<any>();

 //se utiliza el ! para no inicializar alguna varible 
  public audio!: HTMLAudioElement;
  public trackInfo$: BehaviorSubject<any> = new BehaviorSubject(undefined)
  public timeElapsed$: BehaviorSubject<string> = new BehaviorSubject('00:00')
  public timRemaining$: BehaviorSubject<string> = new BehaviorSubject('-00:00')
  public playerStatus$: BehaviorSubject<string> = new BehaviorSubject('paused')
  public playerPercentage$: BehaviorSubject<number> = new BehaviorSubject(0)


  constructor() {
      this.audio = new Audio()
      //capturamos la info de la cancion a reproducir
      this.trackInfo$.subscribe(responseOk => {
        if(responseOk){
          this.setAudio(responseOk)
        }
      })
   }

   private listenAllEvents(): void{
    // evento emitido por el componente html audio: timeupdate
    this.audio.addEventListener('timeupdate', this.calculeTime, false)

    // evento emitido por el componente html audio: playing
    this.audio.addEventListener('playing', this.setPlayerStatus, false)

    // evento emitido por el componente html audio: play
    this.audio.addEventListener('play', this.setPlayerStatus, false)

    // evento emitido por el componente html audio: pause
    this.audio.addEventListener('pause', this.setPlayerStatus, false)

    
    // evento emitido por el componente html audio: ended
    this.audio.addEventListener('ended', this.setPlayerStatus, false)
 
   }

   private calculeTime = () =>{
    const {duration, currentTime} = this.audio;
    this.setTimeElapsed(currentTime);
    this.setTimeRemaining(currentTime, duration);
    this.setPercentage(currentTime, duration); 
   }

   private setPercentage(currentTime: number, duration: number): void{
    const percentage = (currentTime * 100) / duration;
    this.playerPercentage$.next(percentage);
   }

   private setPlayerStatus = (state: any) =>{
      switch(state.type){
        case 'play':
          this.playerStatus$.next('play')
          break;
        case 'playing':
          this.playerStatus$.next('playing')
          break;
        case 'ended':
          this.playerStatus$.next('ended')
          break;
        default:
          this.playerStatus$.next('paused')
          break;
      }
   }

   private setTimeElapsed(currentTime: number) : void{
      let seconds = Math.floor(currentTime % 60);
      let minutes = Math.floor(currentTime / 60) % 60;

      const displaySeconds = (seconds < 10) ? `0${seconds}` : seconds;
      const displayMinutes = (minutes < 10) ? `0${minutes}` : minutes;
      const displayFormat = `${displayMinutes}:${displaySeconds}`;

      this.timeElapsed$.next(displayFormat);
   }

   private setTimeRemaining(currentTime: number, duration: number): void{
      let timeLeft = duration - currentTime;
      let seconds = Math.floor(timeLeft % 60);
      let minutes = Math.floor((timeLeft / 60) % 60);
      const displaySeconds = (seconds < 10) ? `0${seconds}` : seconds;
      const displayMinutes = (minutes < 10) ? `0${minutes}` : minutes;
      const displayFormat = `-${displayMinutes}:${displaySeconds}`;
      this.timRemaining$.next(displayFormat);
   }

   // manda la url del audio a la propiedad del objeto audio html
   public setAudio(track: TrackModel): void {
    //console.log('recibiendo track', track);
    this.audio.src = track.url;
    this.audio.play();
    this.listenAllEvents();
   }

   //cambiar estado de pausa o reproduccion 
   public togglePayer(): void{
    (this.audio.paused) ? this.audio.play() : this.audio.pause()
   }

   // establece el porcentaje de audio en el progressBar
   public seekAudio(percenage: number):void{
    const {duration} = this.audio;
    //100% es la duracion de la cancion {duration}
    
    //regla de tres
    //100% --> duration (200 s)
    //70% (percentage) -->(x s)
    const percentageToSecond = (percenage * duration) / 100

    //asignar porcentaje del progressBar al audio
    this.audio.currentTime = percentageToSecond;
   }
}
