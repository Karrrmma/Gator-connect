import bart_map from "./bart_map.jpg";
import bart_night from "./bart_night.jpg";
import route_28 from "./route_28.jpg";
import route_28R from "./route_28R.jpg";
import route_29 from "./route_29.jpg";
import route_57 from "./route_57.jpg";
import route_91 from "./route_91.jpg";
import route_M from "./route_M.jpg";

export const RouteData = [
    {
      name: "Route 28",
      type: "Muni",
      image: route_28,
      accessibility: true,
      hours: "Monday-Friday, 5am - 12:50am",
      pickUpLocation: "Main Campus Entrance, 19th St",
      additionalInfo: "Route 28 serves downtown and the surrounding areas.",
      midnight: false,
      direction: [
        "Golden Gate Park",
        "Bart Station",
        "Golden Gate Bridge",
        "Marina",
        "Park Presidio",
        "Sunset",
      ],
    },
    {
      name: "Route 28R",
      type: "Muni",
      image: route_28R,
      accessibility: true,
      hours: "Monday - Friday, 5am - 12:50am",
      pickUpLocation: "Main Campus Entrance, 19th St",
      additionalInfo: "Route 28R is an express route with limited stops.",
      midnight: false,
      direction: [
        "Golden Gate Park",
        "Bart Station",
        "Park Presidio",
        "Sunset",
      ],
    },
    {
      name: "Route 29",
      type: "Muni",
      image: route_29,
      accessibility: true,
      hours: "Monday - Friday, 5am - 12:50am",
      pickUpLocation: "Main Campus Entrance, 19th St",
      additionalInfo:
        "Route 29 runs through Sunset District and eventually leads to Golden Gate Park.",
      midnight: false,
      direction: [
        "Golden Gate Park",
        "Sunset",
        "Park Presidio",
        "Bart Station",
        "Bayshore",
      ],
    },
    {
      name: "Route 57",
      type: "Muni",
      image: route_57,
      accessibility: true,
      hours: "Monday - Friday, 5am - 12:50am",
      pickUpLocation: "South Campus, near Mashouf",
      additionalInfo:
        "Route 57 will run through parkmerced and take you to bart.",
      midnight: false,
      direction: ["Lake Merced", "Fort Funston", "Bart Station", "West Portal"],
    },
    {
      name: "Route 91 OWL",
      type: "Muni",
      image: route_91,
      accessibility: true,
      hours: "Monday - Friday, 12am - 6am",
      pickUpLocation: "South campus bus stop, near Mashouf",
      additionalInfo: "Route 91 will run through the entirety of SF.",
      midnight: true,
      direction: [
        "Golden Gate Park",
        "Bart Station",
        "Golden Gate Bridge",
        "Marina",
        "Park Presidio",
        "Downtown",
        "Bayshore",
        "West Portal",
      ],
    },
    {
      name: "Route M",
      type: "Muni Metro",
      image: route_M,
      accessibility: true,
      hours: "Monday - Friday, 5am - 12:50am",
      pickUpLocation: "Main Campus Entrance, 19th St",
      additionalInfo: "Route M will run through Market st toward downtown.",
      midnight: false,
      direction: ["West Portal", "Bart Station", "Downtown"],
    },
    {
      name: "Bay Area Rapid Transit - Day",
      type: "Bart Lines",
      image: bart_map,
      accessibility: true,
      hours: "Monday - Sunday, 5am - 9pm",
      pickUpLocation: "Daly City Bart Station",
      additionalInfo:
        "Bart will take you through the bay area, accesible via SFSU shuttle.",
      midnight: false,
      direction: "Leave SF",
    },
    {
      name: "Bay Area Rapid Transit - Night",
      type: "Bart Lines",
      image: bart_night,
      accessibility: true,
      hours: "Monday - Sunday, 9pm - 12am",
      pickUpLocation: "Daly City Bart Station",
      additionalInfo:
        "Bart will take you through the bay area, accesible via SFSU shuttle.",
      midnight: false,
      direction: "Leave SF",
    },
    {
      name: "SFSU Shuttle",
      type: "Shuttle",
      image: bart_map,
      accessibility: false,
      hours: "Monday - Friday, 7am - 6:30pm",
      pickUpLocation: "Main Campus Entrance, 19th St",
      additionalInfo: "Shuttle will take you to Daly City Bart station.",
      midnight: false,
      direction: "Bart Station",
    },
  ];