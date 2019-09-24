import { Component, OnInit, NgZone } from '@angular/core';
import { RestService } from '../../services/rest-client.service'
import { Observable, of, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})

export class PublicComponent implements OnInit {

  service: RestService;
  notes = [];
  currentNote : any;

  constructor(service : RestService, private ngZone: NgZone) {
    this.service = service
  }

  ngOnInit() {
    this.loadNotes();
  }

  loadNotes()
  {
    this.service.getNotes().subscribe((notes) => {

      this.ngZone.run( () => {
        this.notes = notes;
        if(this.notes.length > 0)
        {
          this.currentNote = this.notes[0]
        }
      });
      
    })
  }

  onAdd()
  {
    this.service.createNew().subscribe((note) => {

      if(note.length == 0)
      {
        return
      }

      this.ngZone.run( () => {
        this.notes.push(note)
        this.currentNote = note
      });

    })
  }

  onSelect(i: number)
  {
    this.currentNote = this.notes[i]
  }

  onSave()
  {
    this.service.update(this.currentNote)
  }
}
