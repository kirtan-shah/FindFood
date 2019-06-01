function argmax(arr) {
  let maxI = 0;
  for(let i = 1; i < arr.length; i++) {
    if(arr[i] > arr[maxI]) maxI = i;
  }
  return maxI;
}

function maxVal(arr) {
  let maxI = 0;
  for(let i = 1; i < arr.length; i++) {
    if(arr[i] > arr[maxI]) maxI = i;
  }
  return arr[maxI];
}
