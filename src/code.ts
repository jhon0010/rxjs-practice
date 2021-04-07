import { of, forkJoin, merge, throwError } from "rxjs";
import { Observable } from "rxjs/internal/Observable";
import { catchError, filter, map, mergeMap } from "rxjs/operators";

const datasource = of(1, 2, 3, 4, 5, 6);

const subscription = datasource
  .pipe(
    //The pipe function is the assembly line from your observable data source through your operators.
    map((value: number) => value + 1),
    filter((value: number) => value > 3)
  )
  .subscribe((value: number) => addItem(value));


const sources: Observable<number>[] = [of(1), of(2), of(3), of(4)];

/**
 * forkJoin
 * Transform the array of observables Observable<number>[] 
 * into a observable of array  Observable<number[]>
 */
forkJoin(sources).pipe(
  map(n => n.map(x => of(x * 2))),
  mergeMap(y => {
    return forkJoin(y).pipe(
      map(num => num.map(w => w * 3))
    )
  })
).subscribe(val => addItem(val)) 


merge(sources).pipe(
  mergeMap(obsNum => obsNum.pipe(
    mergeMap(num => returnRandomUndefined(num).pipe(
      map(probablyUndefined => {

        if(!probablyUndefined){
          const msj  = 'The param is undefined, :(';
          console.error(msj)
          throw new Error(msj)
        }
        return probablyUndefined;
      }),
          
    catchError(err => {
      console.log('!!! Inside the Catch')
      addItem('ERROR')
      return of('Error')
    })
    )),

  ))
).subscribe(val => addItem(val), err => addItem('Error'), () => addItem('complete'));


function returnRandomUndefined(num: number) : Observable<number | undefined>{
  return num % 2 === 0 ? of(num) : of(undefined);
}

function addItem(val: any) {
  var node = document.createElement("li");
  var textNode = document.createTextNode(val);
  node.appendChild(textNode);
  document.getElementById("output").appendChild(node);
}
