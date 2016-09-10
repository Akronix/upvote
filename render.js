function renderSVG( ) {
  console.log('Rendering SVG...')
  canvas = document.getElementById('commonCanvas')
  canvas.innerHTML = renderElement( )
  console.log('rendered SVG!')
}

function renderElement( ) {
  switch (circle.get('type').getValue()) {
    case "circle":
        ret = '<circle cx=' + circle.get('cx').getValue() +' cy='+circle.get('cy').getValue() +
        ' r='+ circle.get('r').getValue() + ' />';
    break;
  }
  console.log('rendered circle!')
  return ret;
}

function paintCircle(paiting,cx,cy,radius,strokeColor,strokeWidth,fillColor) {
  var sharedCircle = _model.createMap();
  sharedCircle = painting.add(sharedCircle)
  sharedCircle.put('type', "circle");
  sharedCircle.put("cx", String(cx));
  sharedCircle.put('cy', String(cy));
  sharedCircle.put('r', String(radius));
  sharedCircle.put('stroke', strokeColor);
  sharedCircle.put('stroke-width', String(strokeWidth));
  sharedCircle.put('fill', fillColor);
  console.log('Created a new SwellRT element')
  return sharedCircle
}

// function shareElement(painting, element) {
//   return painting.add(painting);
// }
