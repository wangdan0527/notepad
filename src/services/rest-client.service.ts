import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AppSettings } from '../environments/app-settings.service'


@Injectable({
  providedIn: 'root'
})

export class RestService {
    

	  Parse: any = require('parse');
  	Note = this.Parse.Object.extend("Note");

  	constructor() {

	  	this.Parse.initialize(AppSettings.APP_KEY, AppSettings.MASTER_KEY);
		  (this.Parse as any).serverURL = AppSettings.PARSE_ENDPOINT;

  	}


  	update(json: any)
  	{
  		var obj = json["original_object"]

  		obj.set("title", json["title"])
  		obj.set("content", json["content"])

  		obj.save()
  	}

  	getNotes() : BehaviorSubject<any>
  	{
  		var query = new this.Parse.Query(this.Note)
  		var subject = new BehaviorSubject<any>([])
  		var result = [];

  		var service = this

  		query.find().then((notes) => {
  			notes.forEach(function(item, index, array) {  				
    				result.push(service.convertToJSON(item))
  			});

  			subject.next(result)
	    }, (err) => {
	      console.log(err)
	    })

	    return subject;
  	}

  	createNew() : BehaviorSubject<any>
  	{
  		const note = new this.Note();
  		var subject = new BehaviorSubject<any>([])
  		note.set("title", "New Note");
  		note.set("content", "");

    	var service = this
  		note.save()
  		.then((note) => {
  		  // Execute any logic that should take place after the object is saved.
  		  subject.next(service.convertToJSON(note))
  		}, (error) => {
  		  // Execute any logic that should take place if the save fails.
  		  // error is a Parse.Error with an error code and message.
  		  console.log('Failed to create new object, with error code: ' + error.message);
  		});

  		return subject;	
  	}

  	convertToJSON(parseObj) : any
  	{
  		var json = parseObj.toJSON()
  		json["original_object"] = parseObj

  		return json
  	}

}
