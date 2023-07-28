export type Orientation = "row" | "column";

export const restartCSSAnimationOnElementById = (elementId: string, cssAnimation: string) => {
    const element = document.getElementById(elementId);
    if (element === null) return;
    // here we restart CSS animation by removing it, reflowing the DOM, and re-adding it
    element.style.animation = "none";
    void element.offsetWidth; // requesting offsetWidth/offsetHeight triggers DOM reflow
    element.style.animation = cssAnimation;
};
