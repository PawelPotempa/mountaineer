## Mountaineer (Ridge v2)

<hr>
During one of our university classes, a good friend of mine asked me if I could make an application that would help him study the topology of Tatra Mountains, which he needs to study in order to pass an exam to become a mountain guide. I happily accepted the challenge and that's how this application came to life!</br>

This is a second attempt at creating this application, applying all the knowledge I got over the last ~8 months. The previous version is available <a href="https://github.com/PawelPotempa/reactjs-firebase-tatra-ridge">HERE</a>.

## The project

The project has been brought to life thanks to the react-leaflet library. In the previous version of the project I've used a large .svg file as a map, which caused some performance issues. This time around the map is properly tiled and loads adequate tiles on per request basis, depending on the current zoom level and position. Also, instead of using multiple files for different map types, I've used the built-in layers function which dynamically changes based on the currently selected mode. In the future I'd definitely use Mapbox or another similar tool to host the images, instead of having them in the /public folder.

Prisma ORM has been used together with PostgreSQL database to handle the data. For the purpose of learning, I've used both the Next.js API as well as SSR in order to handle fetch requests. The data is requestes via a GET method during SSR, while DELETE and POST methods are handled by the API.

Authentication was implemented with NextAuth.js, using GitHub as an OAuth provider. Upon login, the user data is immediately sent to the database, where the session information is stored. Session status is used to prevent some parts of the UI from rendering if the user isn't logged in.

Global state management is handled by Recoil. Three atoms have been made in order to: store fetched data, the currently selected mode as well as form values.

<hr>
The project currently consists of four modes:</br></br>
<li>Learning mode
<li>Practice mode
<li>Game mode
<li>Edit mode

Learning mode allows the user to study through previously placed pins in order to memorize the knowledge.

Practice mode hides the object's name, allowing the user to input what they think the object is. The app actively compares the input to the actual name of the object, returning information whether the user was correct or not in form of adequate colouring. In case the user doesn't know the correct answer - a hint button exists.

Game mode is essentially just a pin randomizer, it displays one element at random, pans the map towards it and prompts the user to input it's name. No more hints available at this stage - it's either right or wrong (indicated by green or red colour of the pin), after which the user can ask for another random pin by clicking the corresponding button or pressing "Enter" on the keyboard.

Edit mode allows the user to put new pins on the map in one of three different shapes, as well as include the description of the particular topological object.

## Technologies

<hr>
<img align="center" alt="Next.JS" src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white"/><img align="center" alt="TypeScript" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/><img align="center" alt="HTML5" src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white"/><img align="center" alt="CSS3" src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white"/><img align="center" alt="Leaflet"  src="https://img.shields.io/badge/Leaflet-199900?style=for-the-badge&logo=Leaflet&logoColor=white"/><img align="center" alt="Prisma" src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white"/><img align="center" alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white"/><img align="center" alt="Recoil" src="https://img.shields.io/badge/Recoil-007AF4?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjI1MDAiIHdpZHRoPSIyMzY4IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjMwIDExIDI3LjUgNzgiPjxyZWN0IGZpbGw9IiMwMDdhZjQiIGhlaWdodD0iOTUiIHJ4PSIxMCIgd2lkdGg9IjkwIi8+PGNpcmNsZSBjeD0iNDMuNSIgY3k9IjE4LjUiIGZpbGw9IiNmZmYiIHI9IjcuNSIvPjxjaXJjbGUgY3g9IjQzLjUiIGN5PSI4MS41IiBmaWxsPSIjZmZmIiByPSI3LjUiLz48ZyBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMyI+PHBhdGggZD0iTTQzLjk5OSAyNUM0Mi41IDM3IDU3LjUgMzQgNTcuNSA0Mi41YzAgNS01Ljg3OCA2LjM2NS0xMy41MDEgN0MzNy45OTkgNTAgMzAgNTAgMzAgNThzMTYgNS41IDEzLjk5OSAxN00zNC4xMzIgMzMuMzUzYzAgMTUuMjg5IDIzLjE1IDE4LjI4OSAyMy4xNSAzMi42MiIvPjwvZz48L3N2Zz4=&logoColor=white"/>

## What I've learned

<hr>

Apart from broadening my knowledge about the react-leaflet's tile system, I've again learned a lot of new things regarding TypeScript. It's my third 'big' application where I used TypeScript and with great pleasure I can say that this time around it has significantly improved and sped up my development process, instead of hindering it. Being able to type things as I go instead of googling everything has certainly helped the process. I look forward to getting more and more experience with this technology!

It was the first time I've used an ORM and I can definitely say that Prisma was a pleasure to use and I'd love to look more into it in the future.

Also, I've used the CSS Modules for the first time. Previously I'd usually use TailwindCSS, styled-components or SASS to handle the styling, but since the UI isn't complicated at all in this projects, I've opted to using the simplest approach.

Apart from technologies, I have significantly improved the way I structure my application. I've used the tsconfig.json "paths" to simplify imports, I kept my components in their own folders and handled the export via a separate index.tsx file. I've improved my hooks knowledge including the ability to create custom hooks.

## Questions

While creating the application, many questions arose, some of which I couldn't easily find an answer to. They're more of a "what's the correct approach" rather than "how to do it", but I'd love to do more research on that.

<li>When using CSS Modules, if the same element exists between multiple components, how do I structure that? Using a specific module for 'global elements' comes to mind, yet seems counterintuitive towards the idea of readability.
<li>When creating forms with a lot of inputs, should they be written out one by one, or is creating a config object and mapping them out a better approach? What are the pros and cons?
<li>Custom hook vs. separate file for reusable functions.
<li>How to properly type refs properly when dealing with complex components instead of HTML elements?
<li>If fetching data in SSR, is using an useEffect to immediately set that data to a global state a good practice? My guts tell me it isn't.
<li>If data is set in a global state, is it ever more performant to pass it as props instead of using the global state?

## Resources

<hr>
<li> <a href="https://react-leaflet.js.org/">🍃 Leaflet documentation</a>
<li> <a href="https://www.prisma.io/">💎 Prisma documentation</a>
<li> <a href="https://next-auth.js.org/">🔒 NextAuth.js documentation</a>
<li> <a href="https://www.typescriptlang.org/">📜 TypeScript documentation - the permanently opened chrome tab</a>
<li> <a href="https://stackoverflow.com/">🙃 StackOverflow, as usual</a>
<li> <a href="http://pza.org.pl/download/314598.pdf">🗺️ The incredible map of the Tatra Mountains</a>

## Thanks for reading!
