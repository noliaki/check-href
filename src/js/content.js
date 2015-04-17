;(function(window){
  "use strict";

  // =======================================
  // variables
  // 
  var win = window,
      document = win.document,
      anchorsLen = 0,
      $body = document.getElementsByTagName("body")[0],

      modalBgName ="__rntHrefChecker-modalBg",
      $modalBg = document.getElementById( modalBgName ),

      containerName = "__rntHrefChecker-imgContainer",
      $anchorContainer = document.getElementById( containerName ),

      mousePoint = {
        x : 0,
        y : 0
      },
      $focus,
      tabId,
      anchors,
      focusIndex = 0,
      tempDiv = document.createElement("div"),
      tempP = document.createElement("p"),
      tempAnchor = document.createElement("span"),
      tempSpan = document.createElement("span"),
      enableDrag = true,
      hrefRegExp = /^(#|＃).*/,
      timer;
      
  // =======================================
  // functions
  // 
  var init = function(){
    window.removeEventListener("resize", onWindowResize, false);
    window.addEventListener("resize", onWindowResize, false);
    
    if( $modalBg || $anchorContainer ){
      $body.removeChild( $modalBg );
      $body.removeChild( $anchorContainer );
      focusIndex = 0;
    } else {
      anchors = document.getElementsByTagName("a");
      anchorsLen = anchors.length;
      setHrefChecker();
    }
  };

  var onWindowResize = function(){
    clearTimeout(timer);
    timer = setTimeout(function(){
      if( $modalBg || $anchorContainer ){
        $body.removeChild( $modalBg );
        $body.removeChild( $anchorContainer );
        focusIndex = 0;
      }
      anchors = document.getElementsByTagName("a");
      anchorsLen = anchors.length;
      setHrefChecker();
    }, 500);
    
  };

  var setHrefChecker = function(){
    var fragment = document.createDocumentFragment(),
        i = -1;
    $modalBg = tempDiv.cloneNode();
    $modalBg.setAttribute("id", modalBgName);

    $anchorContainer = tempDiv.cloneNode();
    $anchorContainer.setAttribute("id", containerName);

    $body.appendChild( $modalBg );
    $body.appendChild( $anchorContainer );
    
    for( ; ++ i < anchorsLen; ){
      fragment.appendChild( createChecker(i) );
    }
    $anchorContainer.appendChild( fragment );
  };

  var onMouseDown = function(event){
    event.preventDefault();

    mousePoint.x = event.layerX;
    mousePoint.y = event.layerY;

    $focus = event.currentTarget;
    $focus.style.zIndex = (++focusIndex);

    document.addEventListener("mousemove", onMouseMove, false);
    document.addEventListener("mouseup", onMouseUp, false);

    return false;
  };

  var onMouseUp = function(event){
    event.preventDefault();
    document.removeEventListener("mousemove", onMouseMove, false);
    document.removeEventListener("mouseup", onMouseUp, false);

    return false;
  };

  var onMouseMove = function(event){
    event.preventDefault();

    if( /onClose/.test( $focus.className ) ){
      return false;
    }
    // if( enableDrag ){
    $focus.style.left = event.pageX - mousePoint.x + "px";
    $focus.style.top = event.pageY - mousePoint.y + "px";
    // }

    return false;
  };

  var onMouseEnter = function(event){
    event.preventDefault();

    var hitArea = event.currentTarget.querySelector(".hitArea"),
        anchorDetail = event.currentTarget.querySelector(".anchor-detail"),
        anchorHref = event.currentTarget.querySelector(".anchor-href");

    // enableDrag = true;

    hitArea.style.width = anchorDetail.offsetWidth + anchorHref.offsetWidth + 7 + "px";
    hitArea.style.height = (anchorDetail.offsetHeight > anchorHref.offsetHeight ? anchorDetail.offsetHeight : anchorHref.offsetHeight) + "px";
  };

  var onMouseOut = function(event){
    event.preventDefault();

    var hitArea = event.currentTarget.querySelector(".hitArea");

    hitArea.style.width = "0px";
    hitArea.style.height = "0px";

    // enableDrag = false;

  };

  var onCloseClick = function( div ){
    return function(event){
      event.preventDefault();
      div.parentNode.removeChild( div );
    }
  };

  var onCloseOut = function( div ){
    return function(event){
      event.preventDefault();

      var className = div.className.replace( /\s*onClose/g, "" );

      div.className = className;
      // enableDrag = true;
    }
  };

  // var onAltMouseEnter = function(event){
  //   enableDrag = false;
  // };

  // var onAltMouseLeave = function(event){
  //   enableDrag = true;
  // };

  var onCloseOver = function( div ){
    return function(event){
      event.preventDefault();
      var className = div.className;
      className = className === "" ? "onClose" : className + " className";
      div.className = className;
      // enableDrag = false;
    }
  };

  var createChecker = function( index ){
    var fragment = document.createDocumentFragment(),
        div = tempDiv.cloneNode(),
        anchorDetail = tempDiv.cloneNode(),
        closeBtn = tempSpan.cloneNode(),
        anchorEle = tempAnchor.cloneNode(),
        hitArea = tempDiv.cloneNode(),
        attrWidth,
        attrHeight,
        alt = tempP.cloneNode(),
        anchorDisplayStyle = anchors[index].style.display,
        anchorHref = anchors[index].getAttribute("href"),
        rect;

    if( anchorDisplayStyle !== "block" && anchorDisplayStyle !== "inline-block" ){
      anchors[index].style.display = "inline-block";
    }

    rect = anchors[index].getBoundingClientRect();

    // div
    if( hrefRegExp.test(anchorHref) || anchorHref === "" ){
      div.className = "anchor-container notice";
    } else {
      div.className = "anchor-container";
    }
    div.style.position = "absolute";
    div.style.top = rect.top + window.pageYOffset + "px";
    div.style.left = rect.left + window.pageXOffset + "px";



    // anchorDetail
    anchorDetail.className = "anchor-href";
    anchorDetail.style.top = 0;
    anchorDetail.style.left = (rect.width === 0? 13 : rect.width) + 7 + "px";
    anchorDetail.innerHTML = anchorHref;

    // anchorEle
    anchorEle.className = "anchor-detail";
    anchorEle.style.width = (rect.width === 0? 13 : rect.width) + "px";
    anchorEle.style.height = (rect.height === 0? 13 : rect.height) + "px";
    anchorEle.innerHTML = anchors[index].innerHTML;

    // closeBtn
    closeBtn.className = "close";
    closeBtn.style.left = (rect.width === 0? 13 : rect.width) + 120 + "px";
    closeBtn.innerHTML = "✕";

    hitArea.className = "hitArea";

    div.addEventListener("mousedown", onMouseDown, false);
    div.addEventListener("mouseup", onMouseUp, false);
    div.addEventListener("mouseover", onMouseEnter, false);
    div.addEventListener("mouseout", onMouseOut, false);

    // alt.addEventListener("mouseover", onAltMouseEnter, false);
    // alt.addEventListener("mouseleave", onAltMouseLeave, false);

    closeBtn.addEventListener("click", onCloseClick(div), false);
    closeBtn.addEventListener("mouseover", onCloseOver(div), false);
    closeBtn.addEventListener("mouseout", onCloseOut(div), false);

    fragment.appendChild(anchorEle);
    fragment.appendChild(anchorDetail);
    fragment.appendChild(hitArea);
    fragment.appendChild(closeBtn);

    div.appendChild( fragment );

    anchors[index].style.display = anchorDisplayStyle;


    return div;
  };

  init();

})(window);