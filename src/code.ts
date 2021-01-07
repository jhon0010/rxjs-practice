import { of } from "rxjs";
import { filter, map } from "rxjs/operators";

const datasource = of(1, 2, 3, 4, 5, 6);

const subscription = datasource
  .pipe(
    //The pipe function is the assembly line from your observable data source through your operators.
    map((value) => value + 1),
    filter((value) => value > 3)
  )
  .subscribe((value) => addItem(value));

function addItem(val: any) {
  var node = document.createElement("li");
  var textNode = document.createTextNode(val);
  node.appendChild(textNode);
  document.getElementById("output").appendChild(node);
}
