import { fromEvent, Observable, Subject } from "rxjs";

var eventObservable = fromEvent(document, "mouse move");

setTimeout(() => {
  eventObservable.subscribe((mouseEvent: any) => {
    addItem(mouseEvent);
  });
}, 100);

var observable = Observable.create((observer: any) => {
  observer.next("Hola mundo!");

  let i = 0;
  setInterval(() => {
    observer.next("Hola mundo! " + i++);
  }, 500);
  // observer.complete();
});

const observer = observable.subscribe(
  (x: any) => addItem(x),
  (error: any) => addItem(error),
  () => addItem("Completed")
);

setTimeout(() => {
  observer.unsubscribe();
}, 5001);

function addItem(val: any) {
  var node = document.createElement("li");
  var textNode = document.createTextNode(val);
  node.appendChild(textNode);
  document.getElementById("output").appendChild(node);
}

//- ------------ Subjects : Can act as a observer and observable at the same time

var subject = new Subject();

subject.subscribe(
  (data) => addItem("Observer1: " + data),
  (error) => addItem(error),
  () => addItem("Observer1 Completed")
);

subject.next("First emited event from subject!");
