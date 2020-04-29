# member-showcase
 3d data visualization

![Bagel](https://github.com/belopot/member-showcase/blob/master/screenshots/1.JPG)
![Bagel](https://github.com/belopot/member-showcase/blob/master/screenshots/2.JPG)

View the project
(https://belopot.github.io/member-showcase/)

## About

A WebGL piece done for a client, this 3D photo directory was used as a showcase piece at a event in Netherlands, where this was shown on a gorgeous event screen the width of a banquet hall.

It was also designed for multi-browser, multi-form factor (desktops, mobiles) in mind, with end users being able to play with the piece on their devices, or on touchscreens.

The idea behind it was to allow participants to visually inspect all attendees of the event, and through filters and search be able to connect to and find information on people within their organization.

The 3D photo visualization piece that is linked is a sanitized demo version with randomly generated names and photos as the real piece has data that should not be shared publicly.

But the principles and ideas behind the piece still stands, and it might be interesting to go through some of the hurdles involved in building this piece of beautiful code art.

## App features
This code art piece changed a lot along the way, from flat 2D photo planes that became cubes (because it fit in with the client’s event design theme).

Originally designed as a sort of a photo selfie mozaic, it morphed into a more useful visualization that could be easily updated and reused for next year.

Many modes were added along the way, like:

The base cube mode
The globe mode (which was designed to mimick the client’s circular logo – it has been changed in this version – and a bit of a “wow” factor during the presentation)
The showcase mode, which highlights a few important organization members
Gender sort, a way for organizing the data so that you can see the breakdown in the organization
Inspect mode, where you can type in a name and it will jump to that person
Filters like by profession and province, where you can see a selection of the data whilst the rest fades into the background
UX design
For each mode, care was taken such that when you transition between modes, there is some animation that gives a bit of a “wow” factor, as well as to cue to the user that the mode has been changed.

There are also various user interactions that allow users to interact with the visualization. This includes:

Zoom in/out using the mouse scroll (or for touch pinch in/out to zoom in/out)
Rotate left/right if you hold down the mouse button and draw across the screen (or for touch swipe left /swipe right)
When you start entering a name under inspect mode, it autocompletes all possible names that are available in the visualization, making it far easier to pick a name
When you click on any photo cube in any mode, it immediately jumps to that photo in inspect mode, letting you know who that person is.
Together with all the modes, sorts and filter functions, and by allowing the end user to search and photo inspect, the 3D viz allows users to explore the dataset in a fun and intuitive way.

## Three.js: WebGL
The 3D portion of the piece is written in Three.js, one of the best well-known javascript libraries on 3D.

All the cubes are mesh objects located in 3D space, and their textures are the photos that have been mapped on 2 sides of the cube. We tried with more faces, but the amount of rendering involved was taxing on the piece, and 2 faces made for a more pleasing design.

The X, Y, and Z positions of the cubes are positioned using algorithms. For example, in the cube mode, a 10 x 10 x 10 addressing space was created and then randomly shuffled and packed with smaller cubes to give the idea of a packed cubic structure. Resting animations to make the cubes move and rotate were added to make the piece more interesting.

In the globe mode, the X, Y, and Z positions of the cubes were aligned according to circular cubic equations. For the filters, the photos are all arranged in squares of the filtered content (with a dynamic camera zoom based on the amount of people filtered).

Thus, when you switch between modes, you simply calculate the new cube positions based on the relevant equations, and then the transitions will occur.

Detecting if you could click a cube was based on raycasting collision detection with the camera. If the cube is hidden by another cube, you cannot click on that object.

## Miscellaneous: libraries used
Hammer.js was my touch library of choice. Originally we used some of javascript’s native click and scroll functions, but they did not mimick as naturally the tap, swipe and pinch in/out functions on a touch screen. Hammer.js touch functions proved to feel more natural and was thus used in the final piece.

SVG and HTML animations for the piece was done using Greensock, my go-to library for animations. From the pop-up information displays, to the sidebar animations, these were done using Greensock.

For the real piece, because we read from a CSV data backend, I used papaparse.js to parse the data into JSON chunks to populate the viz. For this sanitized version, chance.js was the library of choice to generate the random names and data.

And lastly, to round off everything, JQuery and Underscore.js were used. Both of these popular libraries have very useful functions, from DOM manipulation to sorting/filtering.

We investigated the use of other libraries like a load library, but Three.js very basic load manager proved sufficient for the piece, so no load library needed. Phew!

## Miscellaneous: challenges
Because of how browsers’ canvas renderer draws animation frames, whenever the focus of the page is lost (i.e. you switch to another app or tab), the animation frames are not updated and are “paused”. This became an issue because in the animation, the X, Y and Z coordinates of the cubes are still being updated even though the frames are not drawn. Thus, when you switch back to the piece, cubes being in the wrong position is very common.

The fix was a solution based on the clock timer. On detection of defocus, start a timer. When you get back to the piece, detect how much time has elapsed, then repaint the scene based on where the cubes are supposed to be.

Other interesting challenges were due to browser specific issues, especially for mobile. The touch functions required quite a bit of debugging to make sure they work decently with the piece.

All in all, I loved doing a code art piece as pleasing and beautiful as this!