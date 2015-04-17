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
      tempImg = document.createElement("img"),
      tempSpan = document.createElement("span"),
      enableDrag = true,
      hrefRegExp = /^(#|＃).*/;
      
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
    if( $modalBg || $anchorContainer ){
      $body.removeChild( $modalBg );
      $body.removeChild( $anchorContainer );
      focusIndex = 0;
    }
    anchors = document.getElementsByTagName("a");
    anchorsLen = anchors.length;
    setImgChecker();
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
        overlayImage = event.currentTarget.querySelector(".overlayImage"),
        imgDetail = event.currentTarget.querySelector(".anchor-detail");

    // enableDrag = true;

    hitArea.style.width = overlayImage.offsetWidth + imgDetail.offsetWidth + 7 + "px";
    hitArea.style.height = (overlayImage.offsetHeight > imgDetail.offsetHeight ? overlayImage.offsetHeight : imgDetail.offsetHeight) + "px";
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
        imgDetail = tempDiv.cloneNode(),
        closeBtn = tempSpan.cloneNode(),
        txt = "",
        anchorEle = tempImg.cloneNode(),
        hitArea = tempDiv.cloneNode(),
        attrWidth,
        attrHeight,
        alt = tempP.cloneNode(),
        anchorDisplayStyle = anchors[index].style.display,
        anchorHref = anchors[index].getAttribute("href"),
        rect;

    if( anchorDisplayStyle !== "block" || anchorDisplayStyle !== "inline-block" ){
      anchors[index].style.display = "inline-block";
    }

    rect = anchors[index].getBoundingClientRect();

    // div
    console.log( hrefRegExp.test(anchorHref) );
    if( hrefRegExp.test(anchorHref) || anchorHref === "" ){
      div.className = "anchor-container notice";
    } else {
      div.className = "anchor-container";
    }
    div.style.position = "absolute";
    div.style.width = rect.width + "px";
    div.style.height = rect.height + "px";
    div.style.display = "inline-block";
    div.style.top = rect.top + window.pageYOffset + "px";
    div.style.left = rect.left + window.pageXOffset + "px";
    div.innerHTML = anchors[index].innerHTML;

    anchors[index].style.display = anchorDisplayStyle;

    // imgDetal
    // imgDetail.className = "anchor-detail";
    // imgDetail.style.top = 0;
    // imgDetail.style.left = imgs[index].width + 7 + "px";

    // // // closeBtn
    // closeBtn.className = "close";
    // closeBtn.style.left = imgs[index].width + 120 + "px";
    // closeBtn.innerHTML = "✕";


    // // attrWidth
    // attrWidth = imgs[index].getAttribute("width");
    // attrWidth = /^[0-9]+\%$/.test(attrWidth)? attrWidth : parseInt(attrWidth, 10);

    // // attrHeight
    // attrHeight = imgs[index].getAttribute("height");
    // attrHeight = /^[0-9]+\%$/.test(attrHeight)? attrHeight : parseInt(attrHeight, 10);

    // // txt
    // txt += attrWidth !== imgs[index].naturalWidth ? '<p class="width-size defference">[width] : ' : '<p class="width-size">[width] : ';
    // txt += attrWidth + '<br>(<strong>original:' + imgs[index].naturalWidth + '</strong>)</p>';
    // txt += attrHeight !== imgs[index].naturalHeight ? '<p class="height-size defference">[height] : ' : '<p class="height-size">[height] : ';
    // txt += attrHeight + '<br>(<strong>original:' + imgs[index].naturalHeight + '</strong>)</p>';
    // txt += '<p class="alt">[alt]<br>' + imgs[index].alt + '</p>';

    // // alt.className = "alt";
    // // alt.innerHTML = '[alt]<br>' + imgs[index].alt;

    // if(attrWidth !== imgs[index].naturalWidth || attrHeight !== imgs[index].naturalHeight){
    //   div.className += " caution";
    // }

    // imgDetail.innerHTML = txt;
    // // imgDetail.appendChild(alt);

    // img.src = imgs[index].src;
    // img.width = imgs[index].width;
    // img.height = imgs[index].height;
    // img.className = "overlayImage";

    // hitArea.className = "hitArea";

    // div.addEventListener("mousedown", onMouseDown, false);
    // div.addEventListener("mouseup", onMouseUp, false);
    // div.addEventListener("mouseover", onMouseEnter, false);
    // div.addEventListener("mouseout", onMouseOut, false);

    // // alt.addEventListener("mouseover", onAltMouseEnter, false);
    // // alt.addEventListener("mouseleave", onAltMouseLeave, false);

    // closeBtn.addEventListener("click", onCloseClick(div), false);
    // closeBtn.addEventListener("mouseover", onCloseOver(div), false);
    // closeBtn.addEventListener("mouseout", onCloseOut(div), false);

    // fragment.appendChild(img);
    // fragment.appendChild(imgDetail);
    // fragment.appendChild(hitArea);
    // fragment.appendChild(closeBtn);

    div.appendChild( fragment );

    return div;
  };

  init();

})(window);