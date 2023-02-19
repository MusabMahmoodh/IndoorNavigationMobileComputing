
export function graphJsonString(){
  let jsonObj = {
    "nodes": []
  };
  let id = 0

  for (let x = 0; x <= 7; x++) {
    for (let y = 0; y <= 18; y++) {
      id = id + 1;
      let newNode = {
        "id": id,
        "data": {
          "x": x,
          "y": y
        }
      }
      jsonObj.nodes.push(newNode);
    }
  }
  
  const graphJsonStr = JSON.stringify(jsonObj);
  return graphJsonStr;   
}
