<script lang="ts">
  import { createEventDispatcher } from "svelte";

  type Option = {
    id: string;
    label: string;
    value: string | number | boolean;
    className?: string;
    style?: Partial<CSSStyleDeclaration>;
  };

  export let id: string = "";
  export let options: Option[] = [];
  export let value: string | number | boolean;
  export let compact = false;

  const cycleOptions = (val: string, delta: number) => {
    const currentIndex = options.findIndex((item) => item.value.toString() === val);

    if (currentIndex > -1) {
      const nextIndex = (currentIndex + delta + options.length) % options.length;
      return options[nextIndex].value;
    }
  };

  const deCamel = (s: string) => s.replaceAll(/([A-Z])/g, "-$&").toLowerCase();

  const mekStyle = (style: Partial<CSSStyleDeclaration>) =>
    style &&
    Object.entries(style)
      .map(([key, val]) => `${deCamel(key)}: ${val};`)
      .join(" ");

  const dispatch = createEventDispatcher();

  const handleKeydown = (e: KeyboardEvent) => {
    const delta = { j: -1, ArrowLeft: -1, k: 1, ArrowRight: 1 }[e.key];

    const el = e.target;
    if (delta && el instanceof Element) {
      const selectedChild = el.querySelector("input:checked");

      if (selectedChild) {
        const val = selectedChild.getAttribute("value");
        const nextVal = cycleOptions(val, delta);

        dispatch("change", nextVal);
      }
    }
  };
</script>

<div {id} class="ui-select" tabindex="0" on:keydown={handleKeydown}>
  {#each options as option (option.id)}
    <div
      class="ui-select__option"
      class:selected={option.value === value}
      class:visible={!compact || option.value === value}
    >
      <label
        class={["ui-select__label", option.className].join(" ")}
        for={option.id}
        style={mekStyle(option.style)}
      >
        {option.label}
      </label>
      <input
        class="ui-select__input"
        id={option.id}
        type="radio"
        value={option.value}
        checked={option.value === value}
        on:click={() => dispatch("change", option.value)}
      />
    </div>
  {/each}
</div>

<style>
  .ui-select {
    display: flex;
    align-items: center;
    gap: 0.125rem;
    justify-content: center;
    user-select: none;
  }

  .ui-select:focus {
    outline: none;
  }

  .ui-select:focus:after {
    content: "▶";
    position: absolute;
    color: red;
    font-size: 3rem;
    left: 0;
  }

  .ui-select__option {
    border: 1px solid transparent;
  }

  .ui-select__option:not(.visible) {
    display: none;
  }

  .selected {
    border-color: white;
  }

  .ui-select__label {
    border-radius: 0.25rem;
    display: grid;
    line-height: 1rem;
    min-height: 3rem;
    min-width: 1.5rem;
    padding: 0 0.25rem;
    place-items: center;
  }

  .ui-select__option:hover .ui-select__label {
    background-color: #fff3;
  }

  .ui-select__input {
    display: none;
  }
</style>
