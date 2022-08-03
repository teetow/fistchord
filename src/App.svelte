<script>
  import "@fontsource/roboto-serif/variable-full.css";
  import { onMount } from "svelte";

  onMount(() => {
    function keylistener(event) {
      event = event || window.event;
      let key = event.key || event.which || event.key;
      if ((key == "ArrowDown" || key == "j") && active != elements.length - 1) {
        event.preventDefault();
        scroll("down");
      }
      if ((key == "ArrowUp" || key == "k") && active != 0) {
        event.preventDefault();
        scroll("up");
      }
    }

    let elements = document.getElementById("doin").children;
    let active = 0;

    async function scroll(direction) {
      if (active < elements.length) {
        if (direction == "up") {
          active--;
          if (elements[active + 1]) {
            let oldelement = elements[active + 1];
            oldelement.classList.remove("active");
          }
        } else if (direction == "down") {
          active++;
          if (elements[active - 1]) {
            let oldelement = elements[active - 1];
            oldelement.classList.remove("active");
          }
        }

        let element = elements[active];

        element.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        element.classList.add("active");
      }
    }

    var el = window;
    el.addEventListener("keydown", keylistener);
    scroll();
  });
</script>

<div
  id="doin"
  class="flex flex-col gap-4 text-2xl font-normal my-[50%] font-serif"
>
  <div class="verse active">
    <p>[Intro: Ray William Johnson]</p>
    <p>Doin' your mom, doin', doin' your mom</p>
    <p>Doin' your mom, doin', doin' your mom</p>
    <p>Doin', doin' your mom, doin', doin' your mom</p>
    <p>You know we straight, we doin' your mom</p>
    <br />
  </div>
  <div class="verse">
    <p>[Chorus: Ray William Johnson]</p>
    <p>Doin' your mom, doin', doin' your mom</p>
    <p>Doin' your mom, doin', doin' your mom</p>
    <p>Doin', doin' your mom, doin', doin' your mom</p>
    <p>You know we straight, we doin' your mom</p>
    <p>Doin' your mom, doin', doin' your mom</p>
    <p>Doin' your mom, doin', doin' your mom</p>
    <p>Doin', doin' your mom, doin', doin' your mom</p>
    <p>You know we straight, we doin' your mom</p>
    <br />
  </div>
  <div class="verse">
    <p>[Verse 1: Micfri & Ray William Johnson]</p>
    <p>I'm doin' your mom, yes, yours!</p>
    <p>First saw her in the Walmart pickin' out your drawers</p>
    <p>Big Dolly Parton hair like an '80s prom queen</p>
    <p>But her ass was lookin' good all up in them mom-jeans</p>
    <p>I approached her in the checkout line, and said, "Yo baby, wassup?"</p>
    <p>She had two gallons of milk, and I was starin' at her jugs</p>
    <p>Five minutes later, she agreed to get with me</p>
    <p>So we went and rocked the minivan like giggity, giggity, giggity</p>
    <p>I was ridin' your mom like she's Mario Kart</p>
    <p>I gave her a lift back to her crib 'cause her car wouldn't start</p>
    <p>She invited me in the house, and we started makin' out again</p>
    <p>How many times I tap that ass? (Over 9000!)</p>
    <p>Yeah, she called me Pledge cause I knocked the dust off it</p>
    <p>Later made me a sandwich and she cut the crust off it</p>
    <p>'Cause she knows how I like it, and that I'm a little young</p>
    <p>To be in the bed, butt-naked, doin' your mom</p>
    <br />
  </div>
  <div class="verse">
    <p>[Chorus: Ray William Johnson]</p>
    <p>Doin' your mom, doin', doin' your mom</p>
    <p>Doin' your mom, doin', doin' your mom</p>
    <p>Doin', doin' your mom, doin', doin' your mom</p>
    <p>You know we straight, we doin' your mom</p>
    <p>Doin' your mom, doin', doin' your mom</p>
    <p>Doin' your mom, doin', doin' your mom</p>
    <p>Doin', doin' your mom, doin', doin' your mom</p>
    <p>You know we straight, we doin' your mom</p>
    <br />
  </div>
  <div class="verse">
    <p>[Verse 2: Ray William Johnson & Micfri]</p>
    <p>I like your mama's big butt, and I cannot lie</p>
    <p>You other brothers can't deny that she's fly</p>
    <p>We make sexy time, yes, and every night I tap that</p>
    <p>She saw me butt-naked, now she thinks I'm half black</p>
    <p>But your mom's the best, the super M-I-L-F</p>
    <p>'Cause she loves to toss the salad even though she ain't a chef</p>
    <p>And I blame it on the al-al-alcohol</p>
    <p>If I were you, I wouldn't kiss your mom on the mouth at all</p>
    <p>She likes the Donkey-Punch, she likes the Dirty Sanchez</p>
    <p>Sometimes she even likes to fool around in your bed</p>
    <p>She likes rough sex with handcuffs, and I'll be honest</p>
    <p>She likes me to Chris Brown her when she acts like Rihanna</p>
    <p>She's so therapeutic, when I need to cure my restlessness</p>
    <p>I say br-br-br-br-br-br-br-br, motorboat your mom's breastesess</p>
    <p>I didn't wanna tell you, but I had to write this song</p>
    <p>'Cause I'm in your house every night doin' your mo-om</p>
    <br />
  </div>
  <div class="verse">
    <p>[Chorus: Ray William Johnson]</p>
    <p>Doin' your mom, doin', doin' your mom</p>
    <p>Doin' your mom, doin', doin' your mom</p>
    <p>Doin', doin' your mom, doin', doin' your mom</p>
    <p>You know we straight, we doin' your mom</p>
    <p>Doin' your mom, doin', doin' your mom</p>
    <p>Doin' your mom, doin', doin' your mom</p>
    <p>Doin', doin' your mom, doin', doin' your mom</p>
    <p>You know we straight, we doin' your mom</p>
    <br />
  </div>
  <div class="verse">
    <p>[Bridge: Breeze the Beat Machine]</p>
    <p>Sex with your mother</p>
    <p>And that makes me (Better, better) better than you</p>
    <p>I'm having sex with your mother</p>
    <p>And that makes me (Better, better) better than you</p>
    <br />
  </div>
  <div class="verse">
    <p>[Guitar Solo]</p>
    <br />
  </div>
  <div class="verse">
    <p>[Chorus: Ray William Johnson]</p>
    <p>Doin' your mom, doin', doin' your mom</p>
    <p>Doin' your mom, doin', doin' your mom</p>
    <p>Doin', doin' your mom, doin', doin' your mom</p>
    <p>You know we straight, we doin' your mom</p>
    <p>Doin' your mom, doin', doin' your mom</p>
    <p>Doin' your mom, doin', doin' your mom</p>
    <p>Doin', doin' your mom, doin', doin' your mom</p>
    <p>You know we straight, we doin' your mom</p>
  </div>
</div>

<style>
  .verse {
    opacity: 0.5;
  }
  .verse.active {
    opacity: 1;
  }
</style>
