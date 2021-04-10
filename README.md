# Cats opinion nuxt version

## Reasons 

SEO was so bad with pure vue SPA application no matter whati did, so i desided to try nuxt SSR. 
<br><br>

<u>Results were pretty good Google ligthouse SEO score pumped up from 85 -> 95.</u><br><br>
<u>Efficient jumped from 76 -> 89.</u>
Entire test runned much more quiker with nuxt version than vue.
Without any adjustment to meta, texts, headers etc. Vue version was alredy using vue meta.

<br><br>
Also i love to seperate stuff to frontend and backend, im a huge API (and cloud function) fan. I think it is because, i like objectoriented programming where is lot small pieces and everything is responsible at one specific thing. Node with template engine like ejs (catsopinion started with this setup) is great and really powerfull but it gets confusing really fast. It is too close mix with frotend and backend for me. And i feel it requires a very tight and obedient documentation/project structure (i'm too lazy with this, i know i can do better). 

## How was it?

Oh dear... It was not a walk in the park. I started by copying all vue stuff to nuxt components, store, scripts, views as pages etc. Basically **i dit error driven deveploment**, fixing error, after error, after error, until there were no more errors. Vue to nuxt requires lot of patience, judgement and if your project is big and complex (mine is small) it propably is not worth it. Start from scratch and build project from ground up, use what you can on the way. **With nuxt you will find some annoying gotcha's but nothing is perfect, over all nuxt.js is really great option!**
<br><br>

### Data fetching

**Every single data fetch have to be changed** or checked at least, i usually do it in created at vue and nuxt has fetch and async hooks...
I felt like fetch is more "suitable" for me. In newer nuxt version >2.12 it works much like created data fetching. Completely different but coding point of view is almost same.
I also think nuxt favours props, top down data passing. 
<br><br>

### Components not updating

I had a **lot issues with components not updating on data change**. I think it was due to way my data fetching was set up, components were fetching data on their own instead of props. Some components were trickier than others and caching as also a factor. I used nuxt "keep-alive"-prop and that caused weird behaviour especially in the blog page. **Router had to be set up to listen url changes**. **I18n** caused also alot problems and changes to routing.  But on the other hand i think it works now much more consistently and language actually updates when it is changed.
<br><br>

### Store

**Store did not need any changes** a part from syntax change. And i also siplified store a lot but with more <u>complex stores i think there migth be issues.</u>
<br><br>

### SPA cardinal, show and hide components

**No window.something!!!**. This was another, pitfall i had tons of rendered dom not same as virtual dom. These errors originated from "back to top"-button and loading spinners which SPA applications obviously need a lot. However showing and hiding these is hard, server renders them and they immediately change. I think that is the problem. You have to write conditions for these (migth still raise dom error). Or better not render them at all (in server). Nuxt has wonderfull feature called clien-only tag. I think primary reason for nuxt and next is SEO and luckily these components are not crusial SEO factors. So they can be left to client side only.

## What i really liked!

**Plugins, middleware and server-middleware!** God these things are awesome. No more api key fear and if you are using seperate backend or cloud functions you can create api in nuxt which "hides" your true backend from client side. Or if you don't have a lot backend use nuxt also as backend service with api points or middleware. **IMPORTANT: ALWAYS SET UP AXIOS PROXY, CALL TO SERVER-MIDDLEWARE IS CROSS DOMAIN REQUEST**. I dont completely understand why, but i have theory. For some reason (propably nuxt reasons) server lives at localhost (at least server middleware does), however browser lives at catsopinion domain and expects catsopinion response but instead gets localhost as origin. In dev mode this is not problem because you access both browser and server from localhost (i totally missed whole thing). I don't know if there is own "server" for server middleware or nuxt runs some special configuration that results to this. But in the end axios calls even to own server has to be proxyed. *If someone smarter and more experienced reads this at some point please explain this to me, so i will not be noob anymore:)* **There is lot of possibilities compared to basic vue app, this is the power of nuxt.** 

## Conclusion

<u>Is my nuxt app perfect, absolutely not.</u> But **i really enjoyed this whole nuxt journey** and will definetly use it again. Cats opinion is in constant deveplopment so i kinda have to :). 

**Is there any point write a blog site with nuxt?**. No way it is total overkill, there is CMS alternatives for that. But the way i see it, what is the point of beign coder/developer (what ever you wanna call it) if you do not try out new things? I wanted to do this blog with this tech to learn and explore, point was never what is best/easiest/cheapest solution.  

## Disclaimer
*Sorry about language errors! I'm not native english dude XD*







