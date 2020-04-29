"use strict";

var camera, scene, renderer, hammertime;

var group;
var data = []
var dMaxSpace = [];

var camPosition = new THREE.Vector3(0, 0, 3500);
var clock = new THREE.Clock();
var timeOut;

var windowWidth = $(window).width();
var windowHeight = $(window).height();
var mouse = new THREE.Vector2();
var raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3(), 100, 10000);

var rotationCount = 0;
var animMode = "cube";

var menuPanelOpen = false;

var displayAnim = new TimelineLite();
    displayAnim.from(".display", 1, {y:300, autoAlpha:0}, 0)
               .from("#text1", 1, {y:20, autoAlpha:0}, 1)
               .from("#text2", 1, {y:20, autoAlpha:0}, 1.2)
               .from("#text3", 1, {y:20, autoAlpha:0}, 1.4);
    displayAnim.pause();

$( document ).ready(function() {
    getData();
});

/* Durstenfeld shuffle algorithm, an optimized version of Fisher-Yates.*/
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function getData() {
    

    for (var i= -10; i < 10; i++) {
        for (var j = -10; j < 10; j++) {
            for (var k = -10; k < 10; k++) {
                var object = {};
                // Stagger object space such that no cube has a cube directly behind it
                //object.x = i * 2 + k % 2;  
                object.x = i
                object.y = j;
                object.z = k;
                dMaxSpace.push(object);
            }
        }
    }
    
    shuffleArray(dMaxSpace);
    
    var bandSize = 32;
    
    for (var j = 0; j < 24; j++ ) {
        for (var i = 0; i < bandSize; i++ ) {
            var object = {}, 
                pos = new THREE.Vector3(),
                pos2 = new THREE.Vector3();
            
            //Circle arc in 3D space: p = r * acos(ang) + bsin(ang)
            
            pos.x = band[j].radius * (band[j].xSin * Math.sin(2 * Math.PI * (i + band[j].startPosition) /100)) + band[j].x;
            pos.y = band[j].radius * (band[j].ySin * Math.sin(2 * Math.PI * (i + band[j].startPosition) /100)) + band[j].y;
            pos.z = band[j].radius * (1 * Math.cos(2 * Math.PI * (i + band[j].startPosition) /100)) + band[j].z;
            
            pos2.x = dMaxSpace[i + j * bandSize].x * 120;
            pos2.y = dMaxSpace[i + j * bandSize].y * 120;
            pos2.z = dMaxSpace[i + j * bandSize].z * 120;
            
            object.pos = pos;
            object.pos2 = pos2;
            object.color = band[j].color;
            object.color2 = band[j].color2;
            
            object.gender = chance.gender();
            
            if (object.gender == "Male") { object.name = chance.name({gender: "male"}); } else if (object.gender == "Female") { object.name = chance.name({gender: "female"}); }
            object.compareName = object.name.toLowerCase();
            object.profession = chance.profession();
            object.job = chance.company();
            object.province = chance.province({full: true});;
            
            object.reverse = false;
            
            if (object.gender == "Male") { 
                object.pic = 'textures/m' + (Math.floor(Math.random() * 7) + 1) + '.jpg';
            } else if (object.gender == "Female") { 
                object.pic = 'textures/f' + (Math.floor(Math.random() * 7) + 1) + '.jpg';
            } 
            
            data.push(object);
        }
    }
 
    init();
    animate();

}

function init() {
    
    camera = new THREE.PerspectiveCamera( 60, windowWidth / windowHeight, 1, 10000 );

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    scene.fog = new THREE.Fog(0xffffff, 1, 9000);
        
    var geometry = new THREE.BoxBufferGeometry(100, 100, 100);
    
    group = new THREE.Group();

    for ( var i = 0; i < data.length; i ++ ) {
    
        var c = Math.floor(Math.random() * 3);

        var selfie = new THREE.TextureLoader().load(data[i].pic);
        
        //selfie.minFilter = THREE.LinearFilter;
        
        var material = [
            new THREE.MeshBasicMaterial( { color: data[i].color} ),
            new THREE.MeshBasicMaterial( { color: data[i].color} ),
            new THREE.MeshBasicMaterial( { color: data[i].color2} ),
            new THREE.MeshBasicMaterial( { color: data[i].color2} ),
            new THREE.MeshBasicMaterial( { map: selfie } ),
            new THREE.MeshBasicMaterial( { map: selfie } )
        ];
        
        var mesh = new THREE.Mesh( geometry, material );
        mesh.position.x = data[i].pos2.x;
        mesh.position.y = data[i].pos2.y;
        mesh.position.z = data[i].pos2.z;

        //mesh.rotation.x = Math.random() * 2 * Math.PI;
        //mesh.rotation.y = Math.random() * 2 * Math.PI;

        //mesh.matrixAutoUpdate = false;
        //mesh.updateMatrix();
        
        mesh.dataID = i;

        group.add( mesh );

    }

    scene.add( group );


    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( windowWidth, windowHeight );
    $("body").append(renderer.domElement);

    hammertime = new Hammer(renderer.domElement);

    hammertime.on("pan", function(event) {
        // var axis = new THREE.Vector3( 0, 1, 0);
        if (animMode != "transition") {
            if (animMode == "inspect") {
                modeChange("cube");
            } else {
                group.rotation.y += 0.0002 * event.deltaX;
                //group.rotateOnAxis(axis, event.deltaX * 0.001);
            }
        }

    });
    
    hammertime.get("pinch").set({enable:true});
    hammertime.on("pinch", function(event){
        var fov;
        if (event.additionalEvent === "pinchout") {
            fov = camera.fov - event.distance * 0.02;
        } else if (event.additionalEvent === "pinchin") {
            fov = camera.fov + event.distance * 0.02;
        }
        camera.fov = THREE.Math.clamp( fov, 30, 150 );
        camera.updateProjectionMatrix();
        
    });
    
    hammertime.on("tap", function(event){
        onRendererClick(event);
    });
    
    $(window).bind("mousewheel DOMMouseScroll", function(event){
        var fov = camera.fov + event.originalEvent.deltaY * 0.02;
        camera.fov = THREE.Math.clamp( fov, 30, 150 );
        camera.updateProjectionMatrix();
    });
    
    //$(window).on("keypress", onKeyPress);
    $(window).on("visibilitychange", handleVisibilityChange);
    $(window).on("resize", onWindowResize);
    
    
    //----------------------
    // UI elements
    //----------------------

    var drawerAnim = new TimelineLite();
        drawerAnim.to('.menu-wrap', 2, {x:-320, ease: Elastic.easeOut.config(1, 0.5)}, 0)
          .to('#bar1', 0.5, {autoAlpha:0}, 0.1)
          .to('#bar2', 0.5, {morphSVG:"#cross"}, 0.2)
          .to('#bar3', 0.5, {autoAlpha:0}, 0.3)
          .to('.toggle-button', 2, {x:-240, rotation:360, ease: Power2.easeInOut}, 0.1);
          
        drawerAnim
          .from(".menu-sidebar-banner", 1, {autoAlpha:0, scale:0, transitionOrigin:"50% 50%"}, 0.5)
          .staggerFrom(".menu-sidebar button", 1, {autoAlpha:0, y:20}, 0.2, 1)
          .from(".menu-sidebar input", 1, {autoAlpha:0, y:20}, 1.6)
          .staggerFrom(".menu-sidebar form select", 1, {autoAlpha:0, y:20}, 0.2, 1.8);

        drawerAnim
          .staggerFrom(".menu-wrap p", 1, {autoAlpha:0, y: 20}, 0.2, 2.2);
          
    drawerAnim.pause();
    
    $('.toggle-button').on('click', function() {
        if (!menuPanelOpen) {
            menuPanelOpen = true;
            drawerAnim.play().timeScale(2);
        } else {
            menuPanelOpen = false;
            drawerAnim.reverse().timeScale(2.5);
        }
    });
    
    if (windowHeight <= 480) {
        $(".menu-sidebar-banner").hide();
    } else {
        $(".menu-sidebar-banner").show();
    }
    
    $("#globemode").on('click', function(){ 
        modeChange("bands");
        $("#profession").prop("selectedIndex", 0);
        $("#province").prop("selectedIndex", 0);
        $("#namesearch").val("");
        if (windowWidth <= 600) {
            drawerAnim.reverse().timeScale(3);
            menuPanelOpen = false;
        }
    });
    $("#cubemode").on('click', function(){ 
        modeChange("cube");
        $("#profession").prop("selectedIndex", 0);
        $("#province").prop("selectedIndex", 0);
        $("#namesearch").val("");
        if (windowWidth <= 600) {
            drawerAnim.reverse().timeScale(3);
            menuPanelOpen = false;
        }
    });
    $("#gendermode").on('click', function(){ 
        modeChange("gender");
        $("#profession").prop("selectedIndex", 0);
        $("#province").prop("selectedIndex", 0);
        $("#namesearch").val("");
        if (windowWidth <= 600) {
            drawerAnim.reverse().timeScale(3);
            menuPanelOpen = false;
        }
    });
    $("#committeemode").on('click', function(){ 
        $("#profession").prop("selectedIndex", 0);
        $("#province").prop("selectedIndex", 0);
        $("#namesearch").val("");
        modeChange("committee");
        if (windowWidth <= 600) {
            drawerAnim.reverse().timeScale(3);
            menuPanelOpen = false;
        }
    });

    $("#namesearch").autoComplete({
        minChars: 1,
        source: function(term, suggest){
            term = term.toLowerCase();
            var choices = _.map(data, function(obj) {return obj.name});
            
            var suggestions = [];
            for (i=0;i<choices.length;i++)
                if (~choices[i].toLowerCase().indexOf(term)) suggestions.push(choices[i]);
            suggest(suggestions);
        }
    });
    
    $("#search").submit(function() {
        modeChange("inspect", $("#namesearch").val().toLowerCase());
        $("#profession").prop("selectedIndex", 0);
        $("#province").prop("selectedIndex", 0);
        if (windowWidth <= 600) {
            drawerAnim.reverse().timeScale(3);
            menuPanelOpen = false;
        }
        return false;
    });
    
    var professionList = _.uniq(_.map(data, function(obj){ return obj.profession; })).sort();
    var professionCount = _.countBy(_.map(data, function(obj){ return obj.profession; }));
        
    $.each(professionList, function (index, value) {
        $("#profession").append($("<option>").text(value));
    })
    
    $("#profession").change(function() {
        modeChange("profession", $("#profession").val(), professionCount[$("#profession").val()]);
        $("#province").prop("selectedIndex", 0);
        $("#namesearch").val("");
        if (windowWidth <= 600) {
            drawerAnim.reverse().timeScale(3);
            menuPanelOpen = false;
        }
        return false;
    });
    
    var provinceList = _.uniq(_.map(data, function(obj){ return obj.province; })).sort();
    var provinceCount = _.countBy(_.map(data, function(obj){ return obj.province; }));
    
    $.each(provinceList, function (index, value) {
        $("#province").append($("<option>").text(value));
    })
    
    $("#province").change(function() {
        modeChange("province", $("#province").val(), provinceCount[$("#province").val()]);
        $("#profession").prop("selectedIndex", 0);
        $("#namesearch").val("");
        if (windowWidth <= 600) {
            drawerAnim.reverse().timeScale(3);
            menuPanelOpen = false;
        }
        return false;
    });
    
}

//Handler of document when tabbed
function handleVisibilityChange() {
  if (document.hidden) {
      clock.stop();
  } else  {
      clock.start();
  }
}

function onWindowResize() {
    windowWidth = $(window).width();
    windowHeight = $(window).height();

    camera.aspect = windowWidth / windowHeight;
    camera.updateProjectionMatrix();
    
    if (windowHeight <= 480) {
        $(".menu-sidebar-banner").hide();
    } else {
        $(".menu-sidebar-banner").show();
    }

    renderer.setSize(windowWidth, windowHeight);
}

function onRendererClick(event) {

    mouse.x = ( event.center.x / windowWidth ) * 2 - 1;
    mouse.y = - ( event.center.y / windowHeight ) * 2 + 1;
    
    raycaster.setFromCamera( mouse, camera );
    var intersected = raycaster.intersectObjects(group.children);
    if ( intersected.length > 0 ) {
        var cubeHighlighted = data[intersected[0].object.dataID].name;
        $("#yearjoined").prop("selectedIndex", 0);
        $("#region").prop("selectedIndex", 0);
        $("#namesearch").val("");
        modeChange("inspect", cubeHighlighted.toLowerCase());
    };

}

function modeChange(mode, val = "none", number = 0) {
    clearTimeout(timeOut);
    
    if (mode === "bands") {
        
        animMode = "transition";
        displayAnim.reverse().timeScale(3);
        
        for(var i=0; i < group.children.length; i++) {
            data[i].pos2.x = data[i].pos.x;
            data[i].pos2.y = data[i].pos.y;
            data[i].pos2.z = data[i].pos.z;
        }
        
        rotationCount = 0;
        camPosition.x = 0;
        camPosition.y = 0;
        camPosition.z = 5000;
        
        timeOut = setTimeout(function(){ animMode = "bands"; }, 3000)

    } else if (mode === "cube") {
        
        animMode = "transition";
        displayAnim.reverse().timeScale(3);
        
        for(var i=0; i < group.children.length; i++) {
            data[i].pos2.x = dMaxSpace[i].x * 120;
            data[i].pos2.y = dMaxSpace[i].y * 120;
            data[i].pos2.z = dMaxSpace[i].z * 120;
            data[i].reverse = false;
        }
        
        camPosition.x = 0;
        camPosition.y = 0;
        camPosition.z = 4000;
        
        timeOut = setTimeout(function(){ animMode = "cube"; }, 3000)
        
    } else if (mode === "inspect") {
        
        var obj = _.findWhere(data, {compareName: val});
        var target = _.indexOf(data, obj);
        
        if (target != -1  && val != "") {
            animMode = "transition";
            
            $(".display").css("height", "130px").css("width", "250px");
            $("#text1").text(obj.name);
            $("#text2").text(obj.profession);
            $("#text3").text(obj.job);
            displayAnim.restart().timeScale(1);
            
            for(var i=0; i < group.children.length; i++) {
                data[i].pos2.x = dMaxSpace[i].x * 120;
                data[i].pos2.y = dMaxSpace[i].y * 120;
                data[i].pos2.z = dMaxSpace[i].z * 120 * 4;
            }
            
            camPosition.x = data[target].pos2.x;
            camPosition.y = data[target].pos2.y;
            camPosition.z = data[target].pos2.z + 300;
            
            timeOut = setTimeout(function(){ animMode = "inspect"; }, 7000)
        } else {
            if (animMode === "transition") { modeChange("cube"); }
        }

    } else if (mode === "profession") {
    
        animMode = "transition";
        shuffleArray(dMaxSpace);

        $(".display").css("height", "100px").css("width", "250px");
        $("#text1").text(val);
        $("#text2").text("Total " + number);
        $("#text3").text("");
        displayAnim.restart().timeScale(1);
        
        var count = 0;
        var squareSide = Math.ceil(Math.sqrt(number));
        var lastrowOffset = ((squareSide * squareSide - number) % squareSide) / 2;
        
        for(var i=0; i < group.children.length; i++) {
            var profession = data[i].profession;
            
            if (profession === val) {
                if (count < Math.floor(number / squareSide) * squareSide) {
                    data[i].pos2.x = -60 * squareSide + (count % squareSide) * 120 + 60;
                } else {
                    data[i].pos2.x = -60 * squareSide + (count % squareSide) * 120 + lastrowOffset * 120 + 60;
                }
                data[i].pos2.y = 60 * squareSide - Math.floor(count / squareSide) * 120;
                data[i].pos2.z = 0;
                count += 1;
            } else {
                data[i].pos2.x = dMaxSpace[i].x * 120;
                data[i].pos2.y = dMaxSpace[i].y * 120;
                data[i].pos2.z = dMaxSpace[i].z * 120 - 4000;
            }
        }
        
        camPosition.x = 0;
        camPosition.y = 0;
        camPosition.z = squareSide * 100 + 500;
        
        timeOut = setTimeout(function(){ animMode = "profession2"; }, 4000)
        
    } else if (mode === "province") {
    
        animMode = "transition";
        
        $(".display").css("height", "100px").css("width", "250px");
        $("#text1").text(val);
        $("#text2").text("Total " + number);
        $("#text3").text("");
        displayAnim.restart().timeScale(1);
        
        var count = 0;
        var squareSide = Math.ceil(Math.sqrt(number));
        var lastrowOffset = ((squareSide * squareSide - number) % squareSide) / 2;
        
        for(var i=0; i < group.children.length; i++) {
            var province = data[i].province;
            
            if (province === val) {
                if (count < Math.floor(number / squareSide) * squareSide) {
                    data[i].pos2.x = -60 * squareSide + (count % squareSide) * 120 + 60;
                } else {
                    data[i].pos2.x = -60 * squareSide + (count % squareSide) * 120 + lastrowOffset * 120 + 60;
                }
                data[i].pos2.y = 60 * squareSide - Math.floor(count / squareSide) * 120;
                data[i].pos2.z = 0;
                count += 1;
            } else {
                data[i].pos2.x = dMaxSpace[i].x * 120 * 3;
                data[i].pos2.y = dMaxSpace[i].y * 120 * 3;
                data[i].pos2.z = dMaxSpace[i].z * 120 - 4000;
            }
        }
        
        camPosition.x = 0;
        camPosition.y = 0;
        camPosition.z = squareSide * 100 + 500;
        
        timeOut = setTimeout(function(){ animMode = "province2"; }, 4000)

    } else if (mode === "gender") {
        
        animMode = "transition";
        
        var maleCount = 0,
            femaleCount = 0;
        
        for(var i=0; i < group.children.length; i++) {
            if (data[i].gender == "Male") {
                data[i].pos2.x = 500 + (maleCount % 20) * 120;
                data[i].pos2.y = -1200 + Math.floor(maleCount / 20) * 120;
                data[i].pos2.z = 0;
                maleCount++;
            } else {
                data[i].pos2.x = -500 - (femaleCount % 20) * 120;
                data[i].pos2.y = -1200 + Math.floor(femaleCount / 20) * 120;
                data[i].pos2.z = 0;
                femaleCount++;
            }
        }
        
        camPosition.x = 0;
        camPosition.y = 0;
        camPosition.z = 3500;
        
        timeOut = setTimeout(function(){ animMode = "gender2"; }, 4000)
    
    } else if (mode === "committee") {
    
        animMode = "transition";
        displayAnim.reverse().timeScale(3);
        
        var target = Math.floor(Math.random() * group.children.length);
                
        for(var i=0; i < group.children.length; i++) {
            
            var band = Math.ceil(group.children.length / committeeWall.length);
            
            if (i % band === 0) {
                var obj = committeeWall[Math.floor(i / band)];
                data[i].pos2.x = obj.x;
                data[i].pos2.y = obj.y;
                data[i].pos2.z = obj.z + 1500;
            } else {
                data[i].pos2.x = data[i].pos.x;
                data[i].pos2.y = data[i].pos.y;
                data[i].pos2.z = data[i].pos.z;
            }
            
        }
        
        camPosition.x = 0;
        camPosition.y = 0;
        camPosition.z = 3500;
        
        timeOut = setTimeout(function(){ animMode = "committee2"; }, 3000)
    }
    
}

/*
function onKeyPress( event ) {
    var key = event.key;
 
    if (key === "1") {
        modeChange("bands");
    } else if (key === "2") {
        modeChange("cube");
    } else if (key === "3") {
        modeChange("committee");
    }
    
}
*/

function animate() {

    requestAnimationFrame( animate );
    
    render();
}

function render() {
    
    var delta = clock.getDelta();

   //camera.position.x += ( mouseX - camera.position.x ) * (speed * clockDelta);
   //Linear interpolation formula: p = a + (b - a) * t
    
    camera.position.x += (camPosition.x - camera.position.x) * 0.5 * delta;
    camera.position.y += (camPosition.y - camera.position.y) * 0.5 * delta;
    camera.position.z += (camPosition.z - camera.position.z) * 0.5 * delta;

    
    if (animMode === "bands") {
        var bandSize = Math.ceil(group.children.length / 24);
        
        for(var i=0; i < group.children.length; i++) {
            var j = Math.floor(i/bandSize);
            
            group.children[i].position.x = band[j].radius * (band[j].xSin * Math.sin(2 * Math.PI * (i % bandSize + band[j].startPosition + rotationCount) /100)) + band[j].x;
            group.children[i].position.y = band[j].radius * (band[j].ySin * Math.sin(2 * Math.PI * (i % bandSize + band[j].startPosition + rotationCount) /100)) + band[j].y;
            group.children[i].position.z = band[j].radius * Math.cos(2 * Math.PI * (i % bandSize + band[j].startPosition + rotationCount) /100) + band[j].z;
        }
        group.rotation.y -= 0.1 * delta;
        rotationCount += -3 * delta;

    } else if (animMode === "cube") {
        for(var i=0; i < group.children.length; i++) {
            var direction = Math.abs((data[i].pos2.z / 120) % 3);

            if (data[i].reverse === false) {
                if (direction === 0) {
                    if (group.children[i].position.x < data[i].pos2.x + 240) {
                        group.children[i].position.x += 50 * delta;
                    } else data[i].reverse = true;
                } else if (direction === 1) {
                    if (group.children[i].position.y < data[i].pos2.y + 240) {
                        group.children[i].position.y += 50 * delta;
                    } else data[i].reverse = true;
                }
            }
            else if (data[i].reverse === true) {
                if (direction === 0) {
                    if (group.children[i].position.x > data[i].pos2.x - 240) {
                        group.children[i].position.x -= 50 * delta;
                    } else data[i].reverse = false;
                } else if (direction === 1) {
                    if (group.children[i].position.y > data[i].pos2.y - 240) {
                        group.children[i].position.y -= 50 * delta;
                    } else data[i].reverse = false;
                }
            }
            
            group.rotation.y += 0.0002 * delta;
            
        }
    } else if (animMode === "transition") {
        for(var i=0; i < group.children.length; i++) {
            group.children[i].position.x += (data[i].pos2.x - group.children[i].position.x) * 2 * delta;
            group.children[i].position.y += (data[i].pos2.y - group.children[i].position.y) * 2 * delta;
            group.children[i].position.z += (data[i].pos2.z - group.children[i].position.z) * 2 * delta;
        }
        
        if (group.rotation.y > Math.PI * 2) { 
            group.rotation.y -= 2 * Math.PI; 
        } else if (group.rotation.y < -Math.PI * 2) { 
            group.rotation.y += 2 * Math.PI; 
        }
        
        group.rotation.y += (0 - group.rotation.y) * delta;
        
    } else if (animMode === "profession2" || animMode === "province2" || animMode === "gender2") {
        group.rotation.y += 0.05 * delta;
    } else if (animMode === "committee2") {
        group.rotation.y += 0.02 * delta;
    }
    
    renderer.render( scene, camera );
    
}
