"use strict";

var offsetPosition = 5;
var band = [
    {
        xSin:-0.8,
        ySin:1,
        x:300,
        y:200,
        z:-300,
        startPosition: offsetPosition + 3,
        radius: 1600,
        color: new THREE.Color(0x6066ae),
        color2: new THREE.Color(0x222442)
    },
    {
        xSin:-0.8,
        ySin:1,
        x:180,
        y:200,
        z:-300,
        startPosition: offsetPosition + 5,
        radius: 1600,
        color: new THREE.Color(0x6066ae),
        color2: new THREE.Color(0x222442)
    },
    {
        xSin:-0.8,
        ySin:1,
        x:40,
        y:200,
        z:-300,
        startPosition: offsetPosition + 7,
        radius: 1600,
        color: new THREE.Color(0x6066ae),
        color2: new THREE.Color(0x222442)
    },
    {
        xSin:0.1,
        ySin:1,
        x:400,
        y:200,
        z:150,
        startPosition: offsetPosition + 33,
        radius: 1700,
        color: new THREE.Color(0x70dcf3),
        color2: new THREE.Color(0x084e5c)
    },
    {
        xSin:0.1,
        ySin:1,
        x:280,
        y:200,
        z:150,
        startPosition: offsetPosition + 35,
        radius: 1700,
        color: new THREE.Color(0x70dcf3),
        color2: new THREE.Color(0x084e5c)
    },
    {
        xSin:0.1,
        ySin:1,
        x:160,
        y:200,
        z:150,
        startPosition: offsetPosition + 37,
        radius: 1700,
        color: new THREE.Color(0x70dcf3),
        color2: new THREE.Color(0x084e5c)
    },
    {
        xSin: 1,
        ySin:0.7,
        x:220,
        y:-300,
        z:-150,
        startPosition: offsetPosition + 3,
        radius: 1600,
        color: new THREE.Color(0x05cda7),
        color2: new THREE.Color(0x025948)
    },
    {
        xSin: 1,
        ySin:0.7,
        x:220,
        y:-180,
        z:-150,
        startPosition: offsetPosition + 5,
        radius: 1600,
        color: new THREE.Color(0x05cda7),
        color2: new THREE.Color(0x025948)
    },
    {
        xSin: 1,
        ySin:0.7,
        x:220,
        y:-40,
        z:-150,
        startPosition: offsetPosition + 7,
        radius: 1600,
        color: new THREE.Color(0x05cda7),
        color2: new THREE.Color(0x025948)
    },
    {
        xSin: 1,
        ySin: -0.1,
        x:200,
        y:-400,
        z:300,
        startPosition: offsetPosition + 33,
        radius: 1700,
        color: new THREE.Color(0x8dc641),
        color2: new THREE.Color(0x3b5519)
    },
    {
        xSin: 1,
        ySin: -0.1,
        x:200,
        y:-280,
        z:300,
        startPosition: offsetPosition + 35,
        radius: 1700,
        color: new THREE.Color(0x8dc641),
        color2: new THREE.Color(0x3b5519)
    },
    {
        xSin: 1,
        ySin: -0.1,
        x:200,
        y:-160,
        z:300,
        startPosition: offsetPosition + 37,
        radius: 1700,
        color: new THREE.Color(0x8dc641),
        color2: new THREE.Color(0x3b5519)
    },
    {
        xSin: 0.8,
        ySin:-1,
        x:-300,
        y:-320,
        z:-300,
        startPosition: offsetPosition + 3,
        radius: 1600,
        color: new THREE.Color(0xfdde4f),
        color2: new THREE.Color(0x6e5b01)
    },
    {
        xSin: 0.8,
        ySin:-1,
        x:-180,
        y:-320,
        z:-300,
        startPosition: offsetPosition + 5,
        radius: 1600,
        color: new THREE.Color(0xfdde4f),
        color2: new THREE.Color(0x6e5b01)
    },
    {
        xSin: 0.8,
        ySin:-1,
        x:-60,
        y:-320,
        z:-300,
        startPosition: offsetPosition + 7,
        radius: 1600,
        color: new THREE.Color(0xfdde4f),
        color2: new THREE.Color(0x6e5b01)
    },
    {
        xSin: -0.1,
        ySin:-1,
        x:-400,
        y:-200,
        z:150,
        startPosition: offsetPosition + 33,
        radius: 1700,
        color: new THREE.Color(0xf8a32e),
        color2: new THREE.Color(0x683e03)
    },
    {
        xSin: -0.1,
        ySin:-1,
        x:-280,
        y:-200,
        z:150,
        startPosition: offsetPosition + 35,
        radius: 1700,
        color: new THREE.Color(0xf8a32e),
        color2: new THREE.Color(0x683e03)
    },
    {
        xSin: -0.1,
        ySin:-1,
        x:-160,
        y:-200,
        z:150,
        startPosition: offsetPosition + 37,
        radius: 1700,
        color: new THREE.Color(0xf8a32e),
        color2: new THREE.Color(0x683e03)
    },
    {
        xSin: -1,
        ySin:-0.7,
        x:-220,
        y:300,
        z:-150,
        startPosition: offsetPosition + 3,
        radius: 1600,
        color: new THREE.Color(0xff4733),
        color2: new THREE.Color(0x660a00)
    },
    {
        xSin: -1,
        ySin:-0.7,
        x:-220,
        y:180,
        z:-150,
        startPosition: offsetPosition + 5,
        radius: 1600,
        color: new THREE.Color(0xff4733),
        color2: new THREE.Color(0x660a00)
    },
    {
        xSin: -1,
        ySin:-0.7,
        x:-220,
        y:60,
        z:-150,
        startPosition: offsetPosition + 7,
        radius: 1600,
        color: new THREE.Color(0xff4733),
        color2: new THREE.Color(0x660a00)
    },
    {
        xSin: -1,
        ySin:0.1,
        x:-200,
        y:400,
        z:300,
        startPosition: offsetPosition + 33,
        radius: 1700,
        color: new THREE.Color(0xe55eab),
        color2: new THREE.Color(0x580e38)
    },
    {
        xSin: -1,
        ySin:0.1,
        x:-200,
        y:280,
        z:300,
        startPosition: offsetPosition + 35,
        radius: 1700,
        color: new THREE.Color(0xe55eab),
        color2: new THREE.Color(0x580e38)
    },
    {
        xSin: -1,
        ySin:0.1,
        x:-200,
        y:160,
        z:300,
        startPosition: offsetPosition + 37,
        radius: 1700,
        color: new THREE.Color(0xe55eab),
        color2: new THREE.Color(0x580e38)
    }
];

var committeeWall = [
    {
        id: "OIC",
         x: 0,
         y: 600,
         z: 0
    },
    {
        id: "2OIC1",
         x: -100,
         y: 400,
         z: 0
    },
    {
        id: "2OIC2",
         x: 100,
         y: 400,
         z: 0
    },
    {
        id: "Logs1",
         x: -600,
         y: 100,
         z: 0
    },
    {
        id: "Logs2",
         x: -540,
         y: -80,
         z: 0
    },
    {
        id: "Logs3",
         x: -660,
         y: -80,
         z: 0
    },
    {
        id: "Logs4",
         x: -540,
         y: -200,
         z: 0
    },
    {
        id: "Logs5",
         x: -660,
         y: -200,
         z: 0
    },
    {
        id: "Logs6",
         x: -540,
         y: -320,
         z: 0
    },
    {
        id: "Logs7",
         x: -660,
         y: -320,
         z: 0
    },
    {
        id: "Logs8",
         x: -600,
         y: -440,
         z: 0
    },
    {
        id: "Marcom1",
         x: -200,
         y: 100,
         z: 0
    },
    {
        id: "Marcom2",
         x: -140,
         y: -80,
         z: 0
    },
    {
        id: "Marcom3",
         x: -260,
         y: -80,
         z: 0
    },
    {
        id: "Marcom4",
         x: -140,
         y: -200,
         z: 0
    },
    {
        id: "Marcom5",
         x: -260,
         y: -200,
         z: 0
    },
    {
        id: "Marcom6",
         x: -140,
         y: -320,
         z: 0
    },
    {
        id: "Marcom7",
         x: -260,
         y: -320,
         z: 0
    },
    {
        id: "Prog1",
         x: 200,
         y: 100,
         z: 0
    },
    {
        id: "Prog2",
         x: 140,
         y: -80,
         z: 0
    },
    {
        id: "Prog3",
         x: 260,
         y: -80,
         z: 0
    },
    {
        id: "Prog4",
         x: 140,
         y: -200,
         z: 0
    },
    {
        id: "Prog5",
         x: 260,
         y: -200,
         z: 0
    },
    {
        id: "Prog6",
         x: 140,
         y: -320,
         z: 0
    },
    {
        id: "Prog7",
         x: 260,
         y: -320,
         z: 0
    },
    {
        id: "TBCV1",
         x: 500,
         y: 100,
         z: 0
    },
    {
        id: "TBCV1E",
         x: 620,
         y: 100,
         z: 0
    },
    {
        id: "TBCV2",
         x: 500,
         y: -80,
         z: 0
    },
    {
        id: "TBCV3",
         x: 620,
         y: -80,
         z: 0
    },
    {
        id: "TBCV4",
         x: 500,
         y: -200,
         z: 0
    },
    {
        id: "TBCV5",
         x: 620,
         y: -200,
         z: 0
    },
    {
        id: "TBCV6",
         x: 560,
         y: -320,
         z: 0
    }
];
