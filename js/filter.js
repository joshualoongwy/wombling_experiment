import { LightModes } from "./enums.js";

/**
 * Adds the toggling visibility behaviour that occurs when the corresponding layer checkboxes are clicked by the user
 * @param {*} map mapbox map
 */
export function toggleableLayers(map) {
  // enumerate ids of the layers
  // add id's to this array and add a corresponding checkbox to the HTML file to extend functionality to include other layers
  let toggleableLayerIds = ["boundaries", "walls"];

  for (let id of toggleableLayerIds) {
    let layerCheckbox = document.getElementById(`${id}-checkbox`); // all layer filter checkboxes in the HTML file should be in this form
    layerCheckbox.addEventListener("click", (e) => {
      // if the clicked layer doesn't exist, return
      if (!map.getLayer(id)) {
        console.log("Layer not yet rendered");
        return;
      }

      // if the checkbox is checked, make sure the layer is visible by changing the layout object's visibility property
      if (e.target.checked) {
        map.setLayoutProperty(id, "visibility", "visible");
      }
      // if checkbox is NOT checked, make sure the layer is invisible
      else {
        map.setLayoutProperty(id, "visibility", "none");
      }
    });
  }
}

// TODO: move control buttons into one file together?
// ALSO, changing the style just doesn't work, b/c it deletes all existing layers and sources
export class darkModeToggle {
  constructor(mode = LightModes.LIGHT) {
    this._mode = mode;
  }
  onAdd(map) {
    this._map = map;
    this._container = document.createElement("div");
    this._container.className = "mapboxgl-ctrl-group mapboxgl-ctrl";
    this._btn = document.createElement("button");

    this._btn.addEventListener("click", () => {
      // if light, change to dark
      if (this._mode == LightModes.LIGHT) {
        console.log(map.getStyle());
        let currentStyle = map.getStyle();

        this._mode = LightModes.DARK;
        map.setStyle("mapbox://styles/mapbox/dark-v11");
      }
      // if dark, change to light
      else if (this._mode == LightModes.DARK) {
        this._mode = LightModes.LIGHT;
        map.setStyle("mapbox://styles/mapbox/light-v11");
      }
    });

    this._container.appendChild(this._btn);
    return this._container;
  }

  onRemove() {
    this._container.parentNode.removeChild(this._container);
    this._map = undefined;
  }
}
