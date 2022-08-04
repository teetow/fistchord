<script>
  import "@fontsource/roboto-serif/variable-full.css";
  import { onMount } from "svelte";

  const el = ["lyrics", "capo", "chords", "fontsize"];
  let sel = 0;
  let capo = 0;
  let show_chords = true;
  let font = 3;
  const fz = [1, 1.2, 1.5, 2.5, 3.5];
  const sz = ["smallest", "small", "normal", "large", "largest"];

  function nextSelection() {
    document.getElementById(`${el[sel]}-pointer`).classList.remove("pactive");
    sel = (sel + 1) % el.length;
    document.getElementById(`${el[sel]}-pointer`).classList.add("pactive");
  }

  onMount(() => {
    function keylistener(event) {
      // i stole this from stackoverflow
      event = event || window.event;
      let key = event.key || event.which || event.key;

      // check the key pressed and whether there is something to scroll
      if (key == "ArrowDown" || key == "j") {
        event.preventDefault();
        switch (el[sel]) {
          case "lyrics":
            if (active != elements.length - 1) scroll("down");
            break;
          case "capo":
            capochange("down");
            break;
          case "chords":
            chords();
            break;
          case "fontsize":
            fontchange("down");
            break;
        }
      }
      if (key == "ArrowUp" || key == "k") {
        event.preventDefault();
        switch (el[sel]) {
          case "lyrics":
            if (active != 0) scroll("up");
            break;
          case "capo":
            capochange("up");
            break;
          case "chords":
            chords();
            break;
          case "fontsize":
            fontchange("up");
            break;
        }
      }
      if (key == "l") {
        event.preventDefault();
        nextSelection();
      }
    }

    document.getElementById("capo-number").innerText = `${capo}`;
    document.getElementById("lyrics").style.fontSize = `${fz[font]}em`;

    async function fontchange(dir) {
      document.getElementById(`font-${sz[font]}`).classList.remove("selected");
      if (dir == "up") {
        font = (font + 1) % fz.length;
      } else {
        font = (font - 1 + fz.length) % fz.length;
      }
      document.getElementById(`font-${sz[font]}`).classList.add("selected");
      document.getElementById("lyrics").style.fontSize = `${fz[font]}em`;
    }

    async function capochange(dir) {
      if (dir == "up") {
        capo = (capo + 1) % 13;
      } else {
        capo = (capo - 1) % 13;
        if (capo < 0) {
          capo = 12;
        }
      }
      document.getElementById("capo-number").innerText = `${capo}`;
    }

    async function chords() {
      console.log(show_chords);
      if (show_chords) {
        document.getElementById("chords-on").classList.remove("selected");
        document.getElementById("chords-off").classList.add("selected");
        show_chords = false;
      } else {
        document.getElementById("chords-off").classList.remove("selected");
        document.getElementById("chords-on").classList.add("selected");
        show_chords = true;
      }
    }

    let elements = document.getElementById("doin").children;
    // this tracks how far along we are in the song.
    // you would probably want to replace this with a svelte store
    let active = 0;

    async function scroll(direction) {
      if (direction == "up") {
        active--;

        let oldelement = elements[active + 1];
        if (oldelement) {
          oldelement.classList.remove("active");
        }
      } else if (direction == "down") {
        active++;

        let oldelement = elements[active - 1];
        if (oldelement) {
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

    window.addEventListener("keydown", keylistener);

    scroll();
  });
</script>

<div id="sidebar">
  <div class="sidebar-header">
    <div class="pointer sidebar-pointer" id="capo-pointer">▶</div>
    <div class="sidebar-header-text">CAPO</div>
  </div>
  <div id="capo-number">1</div>
  <div class="sidebar-header">
    <div class="pointer sidebar-pointer" id="chords-pointer">▶</div>
    <div class="sidebar-header-text">CHORDS</div>
  </div>
  <div class="on-off">
    <div class="on sidebar-select selected" id="chords-on">ON</div>
    <div class="off sidebar-select" id="chords-off">OFF</div>
  </div>
  <div class="sidebar-header">
    <div class="pointer sidebar-pointer" id="fontsize-pointer">▶</div>
    <div class="sidebar-header-text">FONT SIZE</div>
  </div>
  <div class="aaaaa">
    <div class="smallest sidebar-select" id="font-smallest">A</div>
    <div class="small sidebar-select" id="font-small">A</div>
    <div class="normal sidebar-select" id="font-normal">A</div>
    <div class="large sidebar-select selected" id="font-large">A</div>
    <div class="largest sidebar-select" id="font-largest">A</div>
  </div>
</div>
<div class="pointer pactive" id="lyrics-pointer">▶</div>
<div id="lyrics">
  <div class="ignore" height=600px />
  <div id="doin">
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
  <div class="ignore" />
</div>

<style>
  .verse {
    opacity: 0.5;
    @apply ease-in-out transition-all duration-150 opacity-50;
  }
  .verse.active {
    @apply opacity-100;
  }
</style>
